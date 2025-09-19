from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
from datetime import datetime
import uuid

class Product(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    version: str
    tier: str  # 'lite', 'pro', 'ultimate'
    price: float
    original_price: float
    currency: str = 'USD'
    btc_price: float
    description: str
    features: List[str]
    limitations: List[str] = []
    badge: str = ''
    in_stock: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class ProductCreate(BaseModel):
    name: str
    version: str
    tier: str
    price: float
    original_price: float
    btc_price: float
    description: str
    features: List[str]
    limitations: List[str] = []
    badge: str = ''
    in_stock: bool = True

class Order(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    customer_email: EmailStr
    customer_name: str
    product_id: str
    amount_usd: float
    amount_btc: float
    status: str = 'pending'  # 'pending', 'payment_sent', 'confirmed', 'completed', 'expired'
    btc_address: str = ''
    payment_received: bool = False
    download_token: str = Field(default_factory=lambda: str(uuid.uuid4()))
    expires_at: datetime
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class OrderCreate(BaseModel):
    customer_email: EmailStr
    customer_name: str
    product_id: str
    accept_terms: bool

class BlogPost(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    slug: str
    excerpt: str
    content: str
    author: str
    publish_date: datetime = Field(default_factory=datetime.utcnow)
    read_time: str
    tags: List[str]
    featured: bool = False
    published: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class BlogPostCreate(BaseModel):
    title: str
    excerpt: str
    content: str
    author: str
    read_time: str
    tags: List[str]
    featured: bool = False
    published: bool = True

class FAQ(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    question: str
    answer: str
    category: str
    order: int = 0
    published: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class FAQCreate(BaseModel):
    question: str
    answer: str
    category: str
    order: int = 0
    published: bool = True

class ContactMessage(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    subject: str
    message: str
    inquiry_type: str
    status: str = 'new'  # 'new', 'in_progress', 'resolved'
    created_at: datetime = Field(default_factory=datetime.utcnow)

class ContactMessageCreate(BaseModel):
    name: str
    email: EmailStr
    subject: str
    message: str
    inquiry_type: str

class NewsletterSubscriber(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: EmailStr
    subscribed: bool = True
    subscribed_at: datetime = Field(default_factory=datetime.utcnow)

class NewsletterSubscribe(BaseModel):
    email: EmailStr

class Testimonial(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    role: str
    company: str
    rating: int
    comment: str
    avatar: str
    verified: bool = True
    date: datetime = Field(default_factory=datetime.utcnow)
    created_at: datetime = Field(default_factory=datetime.utcnow)

class Stats(BaseModel):
    total_users: str
    success_rate: str
    countries_served: str
    years_experience: str
    transactions_processed: str
    support_rating: str