from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from models import BlogPost, BlogPostCreate
from database import blog_posts_collection
import re

router = APIRouter(prefix="/api/blog", tags=["blog"])

@router.get("/posts", response_model=List[BlogPost])
async def get_blog_posts(
    skip: int = Query(0, ge=0),
    limit: int = Query(10, ge=1, le=50),
    tag: Optional[str] = None,
    featured: Optional[bool] = None
):
    """Get blog posts with pagination and filtering"""
    filter_query = {"published": True}
    
    if tag:
        filter_query["tags"] = {"$in": [tag]}
    
    if featured is not None:
        filter_query["featured"] = featured
    
    posts = await blog_posts_collection.find(filter_query).skip(skip).limit(limit).to_list(limit)
    return [BlogPost(**post) for post in posts]

@router.get("/posts/{slug}", response_model=BlogPost)
async def get_blog_post(slug: str):
    """Get specific blog post by slug"""
    post = await blog_posts_collection.find_one({"slug": slug, "published": True})
    if not post:
        raise HTTPException(status_code=404, detail="Blog post not found")
    return BlogPost(**post)

@router.get("/posts/search")
async def search_blog_posts(q: str = Query(..., min_length=2)):
    """Search blog posts"""
    # Create text search query
    search_filter = {
        "$and": [
            {"published": True},
            {
                "$or": [
                    {"title": {"$regex": q, "$options": "i"}},
                    {"excerpt": {"$regex": q, "$options": "i"}},
                    {"content": {"$regex": q, "$options": "i"}},
                    {"tags": {"$in": [re.compile(q, re.IGNORECASE)]}}
                ]
            }
        ]
    }
    
    posts = await blog_posts_collection.find(search_filter).limit(20).to_list(20)
    return [BlogPost(**post) for post in posts]

@router.post("/posts", response_model=BlogPost)
async def create_blog_post(post: BlogPostCreate):
    """Create new blog post (admin only)"""
    # Generate slug from title
    slug = re.sub(r'[^a-zA-Z0-9\s-]', '', post.title.lower())
    slug = re.sub(r'\s+', '-', slug.strip())
    
    post_dict = post.dict()
    post_dict["slug"] = slug
    post_obj = BlogPost(**post_dict)
    
    await blog_posts_collection.insert_one(post_obj.dict())
    return post_obj