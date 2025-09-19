from fastapi import APIRouter, HTTPException
from typing import List
from models import NewsletterSubscriber, NewsletterSubscribe
from database import newsletter_subscribers_collection

router = APIRouter(prefix="/api/newsletter", tags=["newsletter"])

@router.post("/subscribe", response_model=NewsletterSubscriber)
async def subscribe_newsletter(subscription: NewsletterSubscribe):
    """Subscribe to newsletter"""
    # Check if email already exists
    existing = await newsletter_subscribers_collection.find_one({
        "email": subscription.email
    })
    
    if existing:
        if existing.get('subscribed', False):
            raise HTTPException(status_code=400, detail="Email already subscribed")
        else:
            # Reactivate subscription
            await newsletter_subscribers_collection.update_one(
                {"email": subscription.email},
                {"$set": {"subscribed": True}}
            )
            updated = await newsletter_subscribers_collection.find_one({
                "email": subscription.email
            })
            return NewsletterSubscriber(**updated)
    
    # Create new subscription
    subscriber_obj = NewsletterSubscriber(**subscription.dict())
    await newsletter_subscribers_collection.insert_one(subscriber_obj.dict())
    return subscriber_obj

@router.post("/unsubscribe")
async def unsubscribe_newsletter(email: str):
    """Unsubscribe from newsletter"""
    result = await newsletter_subscribers_collection.update_one(
        {"email": email},
        {"$set": {"subscribed": False}}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Email not found")
    
    return {"message": "Successfully unsubscribed"}

@router.get("/subscribers", response_model=List[NewsletterSubscriber])
async def get_subscribers():
    """Get all subscribers (admin only)"""
    subscribers = await newsletter_subscribers_collection.find({
        "subscribed": True
    }).sort("subscribed_at", -1).to_list(1000)
    return [NewsletterSubscriber(**sub) for sub in subscribers]