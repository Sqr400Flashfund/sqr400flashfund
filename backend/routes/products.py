from fastapi import APIRouter, HTTPException
from typing import List
from datetime import datetime
from models import Product, ProductCreate
from database import products_collection

router = APIRouter(prefix="/api/products", tags=["products"])

@router.get("/", response_model=List[Product])
async def get_products():
    """Get all products"""
    products = await products_collection.find().to_list(100)
    return [Product(**product) for product in products]

@router.get("/{product_id}", response_model=Product)
async def get_product(product_id: str):
    """Get specific product by ID"""
    product = await products_collection.find_one({"id": product_id})
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return Product(**product)

@router.post("/", response_model=Product)
async def create_product(product: ProductCreate):
    """Create new product (admin only)"""
    # Generate slug from name
    slug = product.name.lower().replace(' ', '-').replace('.', '')
    
    product_dict = product.dict()
    product_obj = Product(**product_dict)
    
    await products_collection.insert_one(product_obj.dict())
    return product_obj

@router.put("/{product_id}", response_model=Product)
async def update_product(product_id: str, product: ProductCreate):
    """Update existing product (admin only)"""
    existing_product = await products_collection.find_one({"id": product_id})
    if not existing_product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    update_data = product.dict()
    update_data["updated_at"] = datetime.utcnow()
    
    await products_collection.update_one(
        {"id": product_id},
        {"$set": update_data}
    )
    
    updated_product = await products_collection.find_one({"id": product_id})
    return Product(**updated_product)