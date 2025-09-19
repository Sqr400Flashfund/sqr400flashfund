from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from models import FAQ, FAQCreate
from database import faqs_collection
import re

router = APIRouter(prefix="/api/faq", tags=["faq"])

@router.get("/", response_model=List[FAQ])
async def get_faqs(category: Optional[str] = None):
    """Get all FAQ items"""
    filter_query = {"published": True}
    
    if category and category != 'all':
        filter_query["category"] = category
    
    faqs = await faqs_collection.find(filter_query).sort("order", 1).to_list(100)
    return [FAQ(**faq) for faq in faqs]

@router.get("/search")
async def search_faqs(q: str = Query(..., min_length=2)):
    """Search FAQ items"""
    search_filter = {
        "$and": [
            {"published": True},
            {
                "$or": [
                    {"question": {"$regex": q, "$options": "i"}},
                    {"answer": {"$regex": q, "$options": "i"}}
                ]
            }
        ]
    }
    
    faqs = await faqs_collection.find(search_filter).limit(20).to_list(20)
    return [FAQ(**faq) for faq in faqs]

@router.post("/", response_model=FAQ)
async def create_faq(faq: FAQCreate):
    """Create new FAQ item (admin only)"""
    faq_obj = FAQ(**faq.dict())
    await faqs_collection.insert_one(faq_obj.dict())
    return faq_obj

@router.get("/categories")
async def get_faq_categories():
    """Get all FAQ categories"""
    categories = await faqs_collection.distinct("category")
    return {"categories": categories}