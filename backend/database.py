from motor.motor_asyncio import AsyncIOMotorClient
import os
from pathlib import Path
from dotenv import load_dotenv

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', 'sqr400')]

# Collections
products_collection = db.products
orders_collection = db.orders
blog_posts_collection = db.blog_posts
faqs_collection = db.faqs
contact_messages_collection = db.contact_messages
newsletter_subscribers_collection = db.newsletter_subscribers
testimonials_collection = db.testimonials

async def init_data():
    """Initialize database with sample data if empty"""
    
    # Check if products exist
    product_count = await products_collection.count_documents({})
    if product_count == 0:
        # Insert initial products
        initial_products = [
            {
                'id': 'sqr400-v58-lite',
                'name': 'SQR400 v5.8 Lite',
                'version': '5.8',
                'tier': 'lite',
                'price': 1200,
                'original_price': 1500,
                'currency': 'USD',
                'btc_price': 0.018,
                'description': 'Essential SQR400 flash software with core banking features for beginners.',
                'features': [
                    'Basic ATM flash capabilities',
                    'Standard security protocols',
                    'User-friendly interface',
                    'Basic transaction processing',
                    'Email support',
                    '30-day money back guarantee'
                ],
                'limitations': [
                    'Limited to 5 transactions per day',
                    'Basic encryption only',
                    'No advanced customization'
                ],
                'badge': 'Most Popular',
                'in_stock': True
            },
            {
                'id': 'sqr400-v58-pro',
                'name': 'SQR400 v5.8 Pro',
                'version': '5.8',
                'tier': 'pro',
                'price': 2000,
                'original_price': 2500,
                'currency': 'USD',
                'btc_price': 0.030,
                'description': 'Advanced SQR400 software with professional-grade features for serious users.',
                'features': [
                    'Unlimited transactions',
                    'Advanced security protocols',
                    'Professional interface',
                    'Batch processing capabilities',
                    'Priority support (24/7)',
                    'Lifetime updates',
                    'Custom transaction limits',
                    'Multi-bank compatibility'
                ],
                'limitations': [],
                'badge': 'Professional',
                'in_stock': True
            },
            {
                'id': 'sqr400-v784',
                'name': 'SQR400 v7.8.4',
                'version': '7.8.4',
                'tier': 'ultimate',
                'price': 2500,
                'original_price': 3000,
                'currency': 'USD',
                'btc_price': 0.037,
                'description': 'Latest SQR400 version with cutting-edge features and enhanced capabilities.',
                'features': [
                    'Next-gen flash algorithms',
                    'AI-powered transaction optimization',
                    'Advanced stealth mode',
                    'Real-time market integration',
                    'VIP support (instant response)',
                    'Lifetime updates + beta access',
                    'Custom scripting support',
                    'Multi-currency support',
                    'Advanced analytics dashboard',
                    'API integration capabilities'
                ],
                'limitations': [],
                'badge': 'Latest Version',
                'in_stock': True
            }
        ]
        
        await products_collection.insert_many(initial_products)
        print("✅ Products initialized")
    
    # Initialize blog posts
    blog_count = await blog_posts_collection.count_documents({})
    if blog_count == 0:
        initial_blog_posts = [
            {
                'id': '1',
                'title': 'What is SQR400? Complete Guide to Flash Software Technology',
                'slug': 'what-is-sqr400-complete-guide',
                'excerpt': 'Discover everything about SQR400 flash software, its capabilities, and why it\'s becoming the industry standard for security professionals.',
                'content': 'SQR400 represents the cutting-edge of flash software technology...',
                'author': 'Tech Team',
                'read_time': '8 min read',
                'tags': ['sqr400', 'flash software', 'security'],
                'featured': True,
                'published': True
            },
            {
                'id': '2',
                'title': 'SQR400 vs Competition: Why We\'re Leading the Market',
                'slug': 'sqr400-vs-competition-market-leader',
                'excerpt': 'A comprehensive comparison showing how SQR400 outperforms other flash software solutions in the market.',
                'content': 'When comparing SQR400 to alternatives found on other sites, our sqr400flashfund.com platform offers superior technology...',
                'author': 'Security Analyst',
                'read_time': '12 min read',
                'tags': ['comparison', 'market analysis', 'sqr400'],
                'featured': True,
                'published': True
            },
            {
                'id': '3',
                'title': 'SQR400 Version History: From v5.8 to v7.8.4 Evolution',
                'slug': 'sqr400-version-history-evolution',
                'excerpt': 'Explore the evolution of SQR400 software through different versions and understand which version suits your needs.',
                'content': 'The journey of SQR400 development showcases continuous innovation...',
                'author': 'Development Team',
                'read_time': '6 min read',
                'tags': ['versions', 'updates', 'features'],
                'featured': False,
                'published': True
            }
        ]
        
        await blog_posts_collection.insert_many(initial_blog_posts)
        print("✅ Blog posts initialized")
    
    # Initialize FAQs
    faq_count = await faqs_collection.count_documents({})
    if faq_count == 0:
        initial_faqs = [
            {
                'id': '1',
                'question': 'Is SQR400 software legal?',
                'answer': 'SQR400 is designed for security testing and educational purposes. Users are responsible for compliance with local laws and regulations. Always ensure you have proper authorization before using any security testing tools.',
                'category': 'legal'
            },
            {
                'id': '2',
                'question': 'Where can I buy SQR400 software?',
                'answer': 'You can purchase SQR400 directly from this official website. We accept Bitcoin payments for secure, anonymous transactions. All purchases include instant download and setup instructions.',
                'category': 'purchase'
            },
            {
                'id': '3',
                'question': 'Does SQR400 really work?',
                'answer': 'Yes, SQR400 has been tested and verified by security professionals worldwide. Our software uses advanced algorithms and has a proven track record. Check our testimonials and case studies for real-world results.',
                'category': 'effectiveness'
            },
            {
                'id': '4',
                'question': 'What\'s the difference between Lite, Pro, and v7.8.4?',
                'answer': 'Lite offers basic features for beginners, Pro includes unlimited transactions and advanced features, while v7.8.4 is our latest version with AI optimization and cutting-edge capabilities. See our comparison chart for detailed differences.',
                'category': 'features'
            },
            {
                'id': '5',
                'question': 'Do you offer refunds?',
                'answer': 'Yes, we offer a 30-day money-back guarantee for the Lite version and lifetime satisfaction guarantee for Pro and v7.8.4. Contact our support team if you\'re not completely satisfied.',
                'category': 'support'
            },
            {
                'id': '6',
                'question': 'How do I get support after purchase?',
                'answer': 'Lite users get email support, Pro users get 24/7 priority support, and v7.8.4 users get VIP instant response support. We also provide comprehensive documentation and video tutorials.',
                'category': 'support'
            }
        ]
        
        await faqs_collection.insert_many(initial_faqs)
        print("✅ FAQs initialized")
    
    # Initialize testimonials
    testimonial_count = await testimonials_collection.count_documents({})
    if testimonial_count == 0:
        initial_testimonials = [
            {
                'id': '1',
                'name': 'Michael Chen',
                'role': 'Financial Systems Analyst',
                'company': 'TechBank Solutions',
                'rating': 5,
                'comment': 'SQR400 Pro has revolutionized our testing procedures. The reliability and advanced features make it indispensable for our operations.',
                'avatar': 'MC',
                'verified': True
            },
            {
                'id': '2',
                'name': 'Sarah Williams',
                'role': 'Security Researcher',
                'company': 'CyberSec Labs',
                'rating': 5,
                'comment': 'The latest v7.8.4 is incredibly powerful. The AI optimization and stealth features are game-changing for professional use.',
                'avatar': 'SW',
                'verified': True
            },
            {
                'id': '3',
                'name': 'David Rodriguez',
                'role': 'IT Specialist',
                'company': 'Independent',
                'rating': 4,
                'comment': 'Started with Lite version, now using Pro. The progression and feature set are excellent. Great investment for serious users.',
                'avatar': 'DR',
                'verified': True
            }
        ]
        
        await testimonials_collection.insert_many(initial_testimonials)
        print("✅ Testimonials initialized")