# SQR400 Flash Fund - Backend Access Guide

## 🌐 **Website URLs**

### **Frontend (Your Website)**
- **Preview URL**: http://localhost:3000
- **Production Domain**: https://sqr400flashfund.com (when deployed)

### **Backend API**
- **Preview URL**: http://localhost:8001/api
- **Production Domain**: https://sqr400flashfund.com/api (when deployed)

## 🔧 **How to Access Backend API**

### **1. API Documentation**
Visit: `http://localhost:8001/docs` to see interactive API documentation with all endpoints

### **2. Test API Endpoints**
You can test these URLs in your browser or using tools like Postman:

- **Get all products**: `http://localhost:8001/api/products/`
- **Get blog posts**: `http://localhost:8001/api/blog/posts`
- **Get FAQs**: `http://localhost:8001/api/faq/`
- **Get statistics**: `http://localhost:8001/api/stats/`
- **Health check**: `http://localhost:8001/api/health`

### **3. Database Access**
- **Database**: MongoDB running locally
- **Data**: All your products, blog posts, FAQs, and testimonials are stored here
- **View Data**: Use MongoDB Compass or the API endpoints above

## 📊 **What the Backend Does**

### **1. Product Management**
- Stores all SQR400 versions with pricing ($1200, $2000, $2500)
- Handles product features, descriptions, and availability
- Provides product data to your website

### **2. Order Processing**
- Creates orders when customers want to buy
- Generates Bitcoin payments with your address: `bc1pxkf6z5nut9v62cy3ufcvcugj5uqra75nxz589swfh0knxadtdmuqkrt6u3`
- Tracks payment status and order fulfillment

### **3. Content Management**
- **Blog Posts**: SEO-optimized articles about SQR400
- **FAQs**: Common questions and answers
- **Testimonials**: Customer reviews and feedback
- **Contact Messages**: Stores customer inquiries

### **4. Communication**
- **Email**: support@sqr400flashfund.com
- **Telegram**: @Sqr400_FlashFund  
- **WhatsApp**: +1 (321) 306-8574

## 🚀 **Key Backend Features**

### **✅ Ready for Production**
- Professional API structure
- Database with real data
- Bitcoin payment integration ready
- Contact form processing
- Newsletter subscriptions

### **✅ SEO Optimized**
- Blog posts target keywords like "sqr400", "flash software"
- Structured data for search engines
- Fast loading times

### **✅ Secure & Scalable**
- Input validation on all endpoints
- Error handling and logging
- Ready for high traffic

## 💼 **For Your Business**

### **Customer Journey**
1. **Customer visits**: sqr400flashfund.com
2. **Browses products**: Sees your 3 SQR400 versions
3. **Places order**: Gets Bitcoin payment address
4. **Pays Bitcoin**: To your address `bc1pxkf6z5nut9v62cy3ufcvcugj5uqra75nxz589swfh0knxadtdmuqkrt6u3`
5. **Gets software**: Download link sent after payment

### **You Receive**
- Bitcoin payments directly to your wallet
- Customer contact info and orders in database
- Email notifications for new orders/contacts

## 🛠️ **Technical Stack**
- **Frontend**: React.js (your website)
- **Backend**: Python FastAPI (handles orders/data)  
- **Database**: MongoDB (stores everything)
- **Payments**: Bitcoin integration ready
- **Domain**: sqr400flashfund.com

## 📞 **Support**
All customer inquiries go to your contact information:
- **Email**: support@sqr400flashfund.com
- **Telegram**: @Sqr400_FlashFund
- **WhatsApp**: +1 (321) 306-8574

---

**Everything is ready to go live on sqr400flashfund.com! 🚀**