import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_BASE = `${BACKEND_URL}/api`;

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API services
export const productService = {
  // Get all products
  getAll: async () => {
    const response = await api.get('/products/');
    return response.data;
  },

  // Get product by ID
  getById: async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },
};

export const orderService = {
  // Create new order
  create: async (orderData) => {
    const response = await api.post('/orders/', orderData);
    return response.data;
  },

  // Get order details
  getById: async (id) => {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  },

  // Verify payment
  verifyPayment: async (id) => {
    const response = await api.post(`/orders/${id}/verify-payment`);
    return response.data;
  },

  // Get download link
  getDownload: async (orderId, token) => {
    const response = await api.get(`/orders/${orderId}/download/${token}`);
    return response.data;
  },
};

export const blogService = {
  // Get all blog posts
  getPosts: async (params = {}) => {
    const response = await api.get('/blog/posts', { params });
    return response.data;
  },

  // Get blog post by slug
  getBySlug: async (slug) => {
    const response = await api.get(`/blog/posts/${slug}`);
    return response.data;
  },

  // Search blog posts
  search: async (query) => {
    const response = await api.get('/blog/posts/search', { params: { q: query } });
    return response.data;
  },
};

export const faqService = {
  // Get all FAQs
  getAll: async (category = null) => {
    const params = category ? { category } : {};
    const response = await api.get('/faq/', { params });
    return response.data;
  },

  // Search FAQs
  search: async (query) => {
    const response = await api.get('/faq/search', { params: { q: query } });
    return response.data;
  },

  // Get FAQ categories
  getCategories: async () => {
    const response = await api.get('/faq/categories');
    return response.data;
  },
};

export const contactService = {
  // Submit contact form
  submit: async (contactData) => {
    const response = await api.post('/contact/', contactData);
    return response.data;
  },
};

export const newsletterService = {
  // Subscribe to newsletter
  subscribe: async (email) => {
    const response = await api.post('/newsletter/subscribe', { email });
    return response.data;
  },

  // Unsubscribe from newsletter
  unsubscribe: async (email) => {
    const response = await api.post('/newsletter/unsubscribe', { email });
    return response.data;
  },
};

export const testimonialService = {
  // Get all testimonials
  getAll: async (verifiedOnly = true) => {
    const response = await api.get('/testimonials/', { 
      params: { verified_only: verifiedOnly } 
    });
    return response.data;
  },
};

export const statsService = {
  // Get statistics
  get: async () => {
    const response = await api.get('/stats/');
    return response.data;
  },
};

// Error handling interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with error status
      console.error('API Error:', error.response.data);
      throw new Error(error.response.data.detail || 'An error occurred');
    } else if (error.request) {
      // Request was made but no response received
      console.error('Network Error:', error.request);
      throw new Error('Network error. Please check your connection.');
    } else {
      // Something else happened
      console.error('Error:', error.message);
      throw new Error(error.message);
    }
  }
);

export default api;