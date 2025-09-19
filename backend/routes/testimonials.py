from fastapi import APIRouter, HTTPException
from typing import List
from models import Testimonial
from database import testimonials_collection

router = APIRouter(prefix="/api/testimonials", tags=["testimonials"])

@router.get("/", response_model=List[Testimonial])
async def get_testimonials(verified_only: bool = True):
    """Get all testimonials"""
    filter_query = {}
    if verified_only:
        filter_query["verified"] = True
    
    testimonials = await testimonials_collection.find(filter_query).sort("date", -1).to_list(100)
    return [Testimonial(**testimonial) for testimonial in testimonials]

@router.get("/{testimonial_id}", response_model=Testimonial)
async def get_testimonial(testimonial_id: str):
    """Get specific testimonial"""
    testimonial = await testimonials_collection.find_one({"id": testimonial_id})
    if not testimonial:
        raise HTTPException(status_code=404, detail="Testimonial not found")
    return Testimonial(**testimonial)