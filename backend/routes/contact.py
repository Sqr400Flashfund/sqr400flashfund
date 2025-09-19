from fastapi import APIRouter, HTTPException, BackgroundTasks
from typing import List
from models import ContactMessage, ContactMessageCreate
from database import contact_messages_collection

router = APIRouter(prefix="/api/contact", tags=["contact"])

@router.post("/", response_model=ContactMessage)
async def submit_contact_form(message: ContactMessageCreate, background_tasks: BackgroundTasks):
    """Submit contact form"""
    message_obj = ContactMessage(**message.dict())
    await contact_messages_collection.insert_one(message_obj.dict())
    
    # TODO: Send email notification to admin
    # background_tasks.add_task(send_contact_notification, message_obj)
    
    return message_obj

@router.get("/messages", response_model=List[ContactMessage])
async def get_contact_messages(status: str = None):
    """Get all contact messages (admin only)"""
    filter_query = {}
    if status:
        filter_query["status"] = status
    
    messages = await contact_messages_collection.find(filter_query).sort("created_at", -1).to_list(100)
    return [ContactMessage(**message) for message in messages]

@router.put("/messages/{message_id}")
async def update_message_status(message_id: str, status: str):
    """Update message status (admin only)"""
    if status not in ['new', 'in_progress', 'resolved']:
        raise HTTPException(status_code=400, detail="Invalid status")
    
    result = await contact_messages_collection.update_one(
        {"id": message_id},
        {"$set": {"status": status}}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Message not found")
    
    return {"message": "Status updated successfully"}