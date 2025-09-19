import React, { useState } from 'react';
import { Mail, MessageCircle, Send, Clock, MapPin, Phone } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    inquiryType: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Mock form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '', inquiryType: 'general' });
      
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 2000);
  };

  const inquiryTypes = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'sales', label: 'Sales Question' },
    { value: 'support', label: 'Technical Support' },
    { value: 'partnership', label: 'Partnership' },
    { value: 'media', label: 'Media Inquiry' }
  ];

  return (
    <div className="relative">
      {/* Header Section */}
      <section className="dark-full-container py-20">
        <div className="dark-content-container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="display-huge mb-6">Get in Touch</h1>
            <p className="body-large text-text-secondary mb-12 max-w-2xl mx-auto">
              Have questions about SQR400? Need technical support? Want to discuss enterprise solutions? 
              We're here to help you succeed.
            </p>
          </div>
        </div>
      </section>

      <section className="dark-full-container py-20">
        <div className="dark-content-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-bg-secondary border border-border-subtle p-8">
              <h2 className="heading-2 mb-6">Send us a Message</h2>
              
              {isSubmitted && (
                <div className="mb-6 p-4 bg-brand-hover border border-brand-primary/20 text-brand-primary">
                  <p className="body-medium">Thank you for your message! We'll get back to you within 24 hours.</p>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block body-medium text-text-primary mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-bg-primary border border-border-subtle text-text-primary placeholder-text-muted focus:outline-none focus:border-brand-primary transition-colors"
                      placeholder="Your full name"
                    />
                  </div>
                  
                  <div>
                    <label className="block body-medium text-text-primary mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-bg-primary border border-border-subtle text-text-primary placeholder-text-muted focus:outline-none focus:border-brand-primary transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block body-medium text-text-primary mb-2">
                    Inquiry Type
                  </label>
                  <select
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-bg-primary border border-border-subtle text-text-primary focus:outline-none focus:border-brand-primary transition-colors"
                  >
                    {inquiryTypes.map(type => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block body-medium text-text-primary mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-bg-primary border border-border-subtle text-text-primary placeholder-text-muted focus:outline-none focus:border-brand-primary transition-colors"
                    placeholder="Brief description of your inquiry"
                  />
                </div>
                
                <div>
                  <label className="block body-medium text-text-primary mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-bg-primary border border-border-subtle text-text-primary placeholder-text-muted focus:outline-none focus:border-brand-primary transition-colors resize-vertical"
                    placeholder="Please provide detailed information about your inquiry..."
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'} <Send size={20} />
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Direct Contact */}
              <div className="bg-bg-secondary border border-border-subtle p-8">
                <h3 className="heading-2 mb-6">Direct Contact</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-brand-hover border border-brand-primary/20 flex items-center justify-center flex-shrink-0">
                      <Mail className="text-brand-primary" size={20} />
                    </div>
                    <div>
                      <h4 className="body-medium font-medium text-text-primary mb-1">Email Support</h4>
                      <p className="body-small text-text-secondary mb-2">support@sqr400flashfund.com</p>
                      <p className="body-small text-text-muted">Response within 24 hours</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-brand-hover border border-brand-primary/20 flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="text-brand-primary" size={20} />
                    </div>
                    <div>
                      <h4 className="body-medium font-medium text-text-primary mb-1">Telegram</h4>
                      <p className="body-small text-text-secondary mb-2">@Sqr400_FlashFund</p>
                      <p className="body-small text-text-muted">Instant messaging support</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-brand-hover border border-brand-primary/20 flex items-center justify-center flex-shrink-0">
                      <Send className="text-brand-primary" size={20} />
                    </div>
                    <div>
                      <h4 className="body-medium font-medium text-text-primary mb-1">WhatsApp</h4>
                      <p className="body-small text-text-secondary mb-2">+1 (321) 306-8574</p>
                      <p className="body-small text-text-muted">Direct messaging available</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div className="bg-bg-secondary border border-border-subtle p-8">
                <h3 className="heading-2 mb-6">Support Hours</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Clock className="text-brand-primary" size={20} />
                    <div>
                      <p className="body-medium text-text-primary">24/7 Support</p>
                      <p className="body-small text-text-muted">For Pro and Ultimate users</p>
                    </div>
                  </div>
                  
                  <div className="border-t border-border-subtle pt-4">
                    <p className="body-small text-text-secondary">
                      <strong>Lite users:</strong> Email support Mon-Fri, 9AM-6PM EST<br/>
                      <strong>Pro users:</strong> 24/7 priority support<br/>
                      <strong>Ultimate users:</strong> VIP instant response
                    </p>
                  </div>
                </div>
              </div>

              {/* Additional Resources */}
              <div className="bg-bg-secondary border border-border-subtle p-8">
                <h3 className="heading-2 mb-6">Self-Service Resources</h3>
                <div className="space-y-3">
                  <a href="/faq" className="block p-3 border border-border-subtle hover:border-brand-primary transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="body-medium text-text-primary">Frequently Asked Questions</span>
                      <span className="text-brand-primary">→</span>
                    </div>
                  </a>
                  
                  <a href="/blog" className="block p-3 border border-border-subtle hover:border-brand-primary transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="body-medium text-text-primary">Knowledge Base</span>
                      <span className="text-brand-primary">→</span>
                    </div>
                  </a>
                  
                  <a href="#" className="block p-3 border border-border-subtle hover:border-brand-primary transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="body-medium text-text-primary">Video Tutorials</span>
                      <span className="text-brand-primary">→</span>
                    </div>
                  </a>
                  
                  <a href="#" className="block p-3 border border-border-subtle hover:border-brand-primary transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="body-medium text-text-primary">Documentation</span>
                      <span className="text-brand-primary">→</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise Contact */}
      <section className="dark-full-container py-20">
        <div className="dark-content-container">
          <div className="bg-bg-secondary border border-border-subtle p-12 text-center max-w-4xl mx-auto">
            <h2 className="display-large mb-6">Enterprise Solutions</h2>
            <p className="body-large text-text-secondary mb-8">
              Looking for custom implementations, bulk licensing, or enterprise-grade support? 
              Our business team is ready to discuss tailored solutions for your organization.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="mailto:enterprise@sqr400flashfund.com" className="btn-primary">
                Contact Enterprise Sales
              </a>
              <a href="#" className="btn-secondary">
                Schedule a Demo
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;