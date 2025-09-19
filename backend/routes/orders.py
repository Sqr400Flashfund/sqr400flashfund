from fastapi import APIRouter, HTTPException, BackgroundTasks
from typing import List
from datetime import datetime, timedelta
import uuid
import secrets
from models import Order, OrderCreate
from database import orders_collection, products_collection

router = APIRouter(prefix="/api/orders", tags=["orders"])

@router.post("/", response_model=Order)
async def create_order(order_data: OrderCreate, background_tasks: BackgroundTasks):
    """Create new order"""
    # Validate product exists
    product = await products_collection.find_one({"id": order_data.product_id})
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    if not product.get('in_stock', True):
        raise HTTPException(status_code=400, detail="Product is out of stock")
    
    # Use the official SQR400 Bitcoin address
    btc_address = "bc1pxkf6z5nut9v62cy3ufcvcugj5uqra75nxz589swfh0knxadtdmuqkrt6u3"
    
    # Create order
    order_dict = {
        "customer_email": order_data.customer_email,
        "customer_name": order_data.customer_name,
        "product_id": order_data.product_id,
        "amount_usd": product['price'],
        "amount_btc": product['btc_price'],
        "btc_address": btc_address,
        "expires_at": datetime.utcnow() + timedelta(minutes=30)  # 30 min expiry
    }
    
    order_obj = Order(**order_dict)
    await orders_collection.insert_one(order_obj.dict())
    
    # TODO: Schedule payment check background task
    # background_tasks.add_task(check_payment_status, order_obj.id)
    
    return order_obj

@router.get("/{order_id}", response_model=Order)
async def get_order(order_id: str):
    """Get order details"""
    order = await orders_collection.find_one({"id": order_id})
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return Order(**order)

@router.post("/{order_id}/verify-payment")
async def verify_payment(order_id: str):
    """Verify Bitcoin payment (mock implementation)"""
    order = await orders_collection.find_one({"id": order_id})
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    
    # Mock payment verification - in real implementation, check blockchain
    # For demo purposes, randomly verify payment after some time
    import random
    payment_verified = random.choice([True, False, False])  # 33% chance
    
    if payment_verified:
        # Update order status
        await orders_collection.update_one(
            {"id": order_id},
            {"$set": {
                "status": "confirmed",
                "payment_received": True,
                "updated_at": datetime.utcnow()
            }}
        )
        
        # TODO: Send download email
        return {"status": "confirmed", "message": "Payment verified successfully"}
    else:
        return {"status": "pending", "message": "Payment not yet detected"}

@router.get("/{order_id}/download/{token}")
async def download_software(order_id: str, token: str):
    """Download software with valid token"""
    order = await orders_collection.find_one({"id": order_id})
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    
    if order.get('download_token') != token:
        raise HTTPException(status_code=403, detail="Invalid download token")
    
    if order.get('status') != 'confirmed' or not order.get('payment_received'):
        raise HTTPException(status_code=403, detail="Payment not confirmed")
    
    # In real implementation, return file download
    return {
        "download_url": f"https://downloads.sqr400.com/{order_id}/{token}/software.zip",
        "expires_at": datetime.utcnow() + timedelta(hours=24),
        "instructions": "Download will expire in 24 hours. Please save the file immediately."
    }