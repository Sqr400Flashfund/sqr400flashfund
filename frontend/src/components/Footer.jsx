import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, MessageCircle, Send } from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Mock newsletter subscription
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <footer className="bg-bg-secondary border-t border-border-subtle">
      <div className="dark-content-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-brand-primary flex items-center justify-center text-black font-bold text-xl">
                S
              </div>
              <span className="text-brand-primary text-xl font-semibold">SQR400</span>
            </div>
            <p className="body-small text-text-muted mb-6">
              Professional flash software solutions for security testing and banking operations.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-text-muted hover:text-brand-primary transition-colors">
                <Mail size={20} />
              </a>
              <a href="#" className="text-text-muted hover:text-brand-primary transition-colors">
                <MessageCircle size={20} />
              </a>
              <a href="#" className="text-text-muted hover:text-brand-primary transition-colors">
                <Send size={20} />
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="heading-3 mb-4">Products</h3>
            <ul className="space-y-2">
              <li><Link to="/product/sqr400-v58-lite" className="body-small text-text-muted hover:text-text-primary transition-colors">SQR400 v5.8 Lite</Link></li>
              <li><Link to="/product/sqr400-v58-pro" className="body-small text-text-muted hover:text-text-primary transition-colors">SQR400 v5.8 Pro</Link></li>
              <li><Link to="/product/sqr400-v784" className="body-small text-text-muted hover:text-text-primary transition-colors">SQR400 v7.8.4</Link></li>
              <li><Link to="/products" className="body-small text-text-muted hover:text-text-primary transition-colors">Compare Versions</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="heading-3 mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/blog" className="body-small text-text-muted hover:text-text-primary transition-colors">Blog</Link></li>
              <li><Link to="/faq" className="body-small text-text-muted hover:text-text-primary transition-colors">FAQ</Link></li>
              <li><Link to="/contact" className="body-small text-text-muted hover:text-text-primary transition-colors">Support</Link></li>
              <li><a href="#" className="body-small text-text-muted hover:text-text-primary transition-colors">Documentation</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="heading-3 mb-4">Stay Updated</h3>
            <p className="body-small text-text-muted mb-4">
              Get the latest updates on SQR400 releases and security insights.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full px-4 py-2 bg-bg-overlay border border-border-subtle text-text-primary placeholder-text-muted focus:outline-none focus:border-brand-primary transition-colors"
              />
              <button
                type="submit"
                className="btn-primary w-full"
                disabled={subscribed}
              >
                {subscribed ? 'Subscribed!' : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-border-subtle mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="body-small text-text-muted">
              © 2025-2026 SQR400. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="body-small text-text-muted hover:text-text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="body-small text-text-muted hover:text-text-primary transition-colors">Terms of Service</a>
              <a href="#" className="body-small text-text-muted hover:text-text-primary transition-colors">Refund Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;