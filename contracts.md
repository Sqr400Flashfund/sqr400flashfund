# SQR400 Website Backend Integration Contracts

## Overview
This document defines the API contracts and integration points between the SQR400 frontend and backend systems.

## Database Models

### Products
```python
class Product(BaseModel):
    id: str
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
    created_at: datetime
    updated_at: datetime
```

### Orders
```python
class Order(BaseModel):
    id: str
    customer_email: str
    customer_name: str
    product_id: str
    amount_usd: float
    amount_btc: float
    status: str  # 'pending', 'payment_sent', 'confirmed', 'completed', 'expired'
    btc_address: str
    payment_received: bool = False
    download_token: str = ''
    expires_at: datetime
    created_at: datetime
    updated_at: datetime
```

### Blog Posts
```python
class BlogPost(BaseModel):
    id: str
    title: str
    slug: str
    excerpt: str
    content: str
    author: str
    publish_date: datetime
    read_time: str
    tags: List[str]
    featured: bool = False
    published: bool = True
    created_at: datetime
    updated_at: datetime
```

### FAQ Items
```python
class FAQ(BaseModel):
    id: str
    question: str
    answer: str
    category: str
    order: int = 0
    published: bool = True
    created_at: datetime
    updated_at: datetime
```

### Contact Messages
```python
class ContactMessage(BaseModel):
    id: str
    name: str
    email: str
    subject: str
    message: str
    inquiry_type: str
    status: str = 'new'  # 'new', 'in_progress', 'resolved'
    created_at: datetime
```

### Newsletter Subscribers
```python
class NewsletterSubscriber(BaseModel):
    id: str
    email: str
    subscribed: bool = True
    subscribed_at: datetime
```

## API Endpoints

### Products API
- `GET /api/products` - Get all products
- `GET /api/products/{id}` - Get specific product
- `POST /api/products` - Create product (admin)
- `PUT /api/products/{id}` - Update product (admin)
- `DELETE /api/products/{id}` - Delete product (admin)

### Orders & Checkout API
- `POST /api/orders` - Create new order
- `GET /api/orders/{id}` - Get order details
- `POST /api/orders/{id}/verify-payment` - Verify Bitcoin payment
- `GET /api/orders/{id}/download/{token}` - Download software

### Blog API
- `GET /api/blog/posts` - Get all blog posts (with pagination)
- `GET /api/blog/posts/{slug}` - Get specific blog post
- `GET /api/blog/posts/search?q={query}` - Search blog posts
- `POST /api/blog/posts` - Create blog post (admin)
- `PUT /api/blog/posts/{id}` - Update blog post (admin)

### FAQ API
- `GET /api/faq` - Get all FAQ items
- `GET /api/faq/search?q={query}` - Search FAQ items
- `POST /api/faq` - Create FAQ item (admin)
- `PUT /api/faq/{id}` - Update FAQ item (admin)

### Contact API
- `POST /api/contact` - Submit contact form
- `GET /api/contact/messages` - Get all messages (admin)
- `PUT /api/contact/messages/{id}` - Update message status (admin)

### Newsletter API
- `POST /api/newsletter/subscribe` - Subscribe to newsletter
- `POST /api/newsletter/unsubscribe` - Unsubscribe from newsletter

### Bitcoin Payment API
- `POST /api/payments/create-invoice` - Create Bitcoin payment invoice
- `GET /api/payments/invoice/{id}` - Get invoice details
- `POST /api/payments/webhook` - Handle BTCPay Server webhooks
- `GET /api/payments/verify/{order_id}` - Verify payment status

## Frontend Integration Points

### Mock Data Replacement
Current mock data in `/frontend/src/mock.js` will be replaced with API calls:

1. **Products Data**: Replace `mockProducts` with API calls to `/api/products`
2. **Blog Data**: Replace `mockBlogPosts` with API calls to `/api/blog/posts`
3. **FAQ Data**: Replace `mockFAQs` with API calls to `/api/faq`
4. **Testimonials**: Move to database and fetch via `/api/testimonials`
5. **Stats**: Calculate real-time from database via `/api/stats`

### Payment Flow Integration
1. **Checkout Process**: 
   - Customer fills form → `POST /api/orders` → Get BTC address
   - Frontend polls `/api/orders/{id}` for payment status
   - On confirmation → Email sent with download link

2. **Bitcoin Payment**:
   - Use BTCPay Server integration for payment processing
   - Webhook handles payment confirmations
   - Automatic email delivery on successful payment

### Email Integration
- **Order Confirmation**: Sent after payment confirmed
- **Download Links**: Secure tokenized download links
- **Support Communications**: Contact form submissions
- **Newsletter**: Marketing communications

## Security Considerations
1. **API Authentication**: JWT tokens for admin endpoints
2. **Rate Limiting**: Protect against abuse
3. **Input Validation**: Sanitize all user inputs
4. **Download Security**: Tokenized, expiring download links
5. **Payment Security**: BTCPay Server webhook signature verification

## Environment Variables Required
```
# Database
MONGO_URL=mongodb://localhost:27017/sqr400

# BTCPay Server
BTCPAY_SERVER_URL=https://your-btcpay-server.com
BTCPAY_API_KEY=your-api-key
BTCPAY_STORE_ID=your-store-id
BTCPAY_WEBHOOK_SECRET=webhook-secret

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# JWT
JWT_SECRET=your-jwt-secret
JWT_EXPIRES_IN=24h

# File Storage
DOWNLOAD_BASE_URL=https://your-domain.com/downloads
DOWNLOAD_SECRET_KEY=file-signing-key
```

## Implementation Priority
1. **Phase 1**: Products API, basic order creation
2. **Phase 2**: Bitcoin payment integration
3. **Phase 3**: Blog and FAQ APIs
4. **Phase 4**: Contact and newsletter functionality
5. **Phase 5**: Admin dashboard and reporting