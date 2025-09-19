from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path

# Import routes
from routes import products, orders, blog, faq, contact, newsletter, testimonials, stats
from database import init_data

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', 'sqr400')]

# Create the main app without a prefix
app = FastAPI(title="SQR400 API", description="Professional SQR400 Flash Software API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Original test routes
@api_router.get("/")
async def root():
    return {"message": "SQR400 API is running"}

@api_router.get("/health")
async def health_check():
    return {"status": "healthy", "service": "SQR400 API"}

# Include all route modules
app.include_router(products.router)
app.include_router(orders.router)
app.include_router(blog.router)
app.include_router(faq.router)
app.include_router(contact.router)
app.include_router(newsletter.router)
app.include_router(testimonials.router)
app.include_router(stats.router)

# Include the basic API router
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("startup")
async def startup_event():
    """Initialize database with sample data"""
    await init_data()
    logger.info("✅ SQR400 API started successfully")

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()