import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowRight, Shield, Zap, Users, Download, Star, Check } from 'lucide-react';
import { useApi } from '../hooks/useApi';
import { productService, testimonialService } from '../services/api';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('features');
  
  // Fetch product data
  const { data: product, loading: productLoading } = useApi(() => productService.getById(id), [id]);
  const { data: allProducts, loading: allProductsLoading } = useApi(() => productService.getAll());
  const { data: testimonials, loading: testimonialsLoading } = useApi(() => testimonialService.getAll());

  const relatedProducts = allProducts?.filter(p => p.id !== id) || [];
  const productTestimonials = testimonials?.filter(t => t.id <= 2) || []; // Show relevant testimonials

  if (productLoading || allProductsLoading || testimonialsLoading) {
    return (
      <div className="dark-full-container py-20">
        <div className="dark-content-container text-center">
          <div className="display-large text-brand-primary mb-4">Loading...</div>
          <p className="body-large text-text-secondary">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="dark-full-container py-20">
        <div className="dark-content-container text-center">
          <h1 className="display-large mb-6">Product Not Found</h1>
          <Link to="/products" className="btn-primary">
            View All Products <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'features', label: 'Features', icon: Star },
    { id: 'specifications', label: 'Specifications', icon: Shield },
    { id: 'support', label: 'Support', icon: Users }
  ];

  return (
    <div className="relative">
      {/* Product Header */}
      <section className="dark-full-container py-20">
        <div className="dark-content-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-4">
                <span className="px-3 py-1 bg-brand-hover text-brand-primary text-sm font-medium border border-brand-primary/20">
                  {product.badge}
                </span>
              </div>
              <h1 className="display-huge mb-6">{product.name}</h1>
              <p className="body-large text-text-secondary mb-8">
                {product.description}
              </p>
              
              <div className="flex items-baseline gap-4 mb-8">
                <span className="display-large text-brand-primary">${product.price}</span>
                {product.originalPrice > product.price && (
                  <span className="body-large text-text-muted line-through">${product.originalPrice}</span>
                )}
                <span className="body-medium text-text-secondary">or ₿{product.btcPrice} BTC</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link to={`/checkout/${product.id}`} className="btn-primary">
                  Buy Now <ArrowRight size={20} />
                </Link>
                <Link to="/contact" className="btn-secondary">
                  Contact Sales <Users size={20} />
                </Link>
              </div>

              <div className="flex items-center gap-6 text-text-muted body-small">
                <div className="flex items-center gap-2">
                  <Download size={16} />
                  <span>Instant Download</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield size={16} />
                  <span>Secure Payment</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap size={16} />
                  <span>24/7 Support</span>
                </div>
              </div>
            </div>

            <div className="bg-bg-secondary border border-border-subtle p-8">
              <h3 className="heading-2 mb-6">Quick Overview</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="body-medium text-text-muted">Version</span>
                  <span className="body-medium text-text-primary">{product.version}</span>
                </div>
                <div className="flex justify-between">
                  <span className="body-medium text-text-muted">Tier</span>
                  <span className="body-medium text-text-primary capitalize">{product.tier}</span>
                </div>
                <div className="flex justify-between">
                  <span className="body-medium text-text-muted">Price</span>
                  <span className="body-medium text-brand-primary">${product.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="body-medium text-text-muted">Bitcoin Price</span>
                  <span className="body-medium text-brand-primary">₿{product.btcPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span className="body-medium text-text-muted">Availability</span>
                  <span className="body-medium text-brand-primary">
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Details Tabs */}
      <section className="dark-full-container py-20">
        <div className="dark-content-container">
          {/* Tab Navigation */}
          <div className="flex justify-center mb-12">
            <div className="flex bg-bg-secondary border border-border-subtle">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    className={`flex items-center gap-2 px-6 py-3 body-medium transition-colors ${
                      activeTab === tab.id
                        ? 'bg-brand-primary text-black'
                        : 'text-text-secondary hover:text-text-primary'
                    }`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <Icon size={18} />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab Content */}
          <div className="max-w-4xl mx-auto">
            {activeTab === 'features' && (
              <div>
                <h3 className="heading-2 mb-8 text-center">Complete Feature List</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3 p-4 bg-bg-secondary border border-border-subtle">
                      <Check className="text-brand-primary" size={20} />
                      <span className="body-medium text-text-secondary">{feature}</span>
                    </div>
                  ))}
                </div>
                
                {product.limitations.length > 0 && (
                  <div className="mt-12">
                    <h4 className="heading-3 mb-6 text-center">Limitations</h4>
                    <div className="space-y-3">
                      {product.limitations.map((limitation, index) => (
                        <div key={index} className="flex items-center gap-3 p-4 bg-bg-secondary border border-border-subtle opacity-60">
                          <div className="w-5 h-5 border border-text-muted rounded-full flex items-center justify-center">
                            <div className="w-2 h-0.5 bg-text-muted"></div>
                          </div>
                          <span className="body-medium text-text-muted">{limitation}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'specifications' && (
              <div>
                <h3 className="heading-2 mb-8 text-center">Technical Specifications</h3>
                <div className="bg-bg-secondary border border-border-subtle p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="heading-3 mb-4">System Requirements</h4>
                      <ul className="space-y-2 body-medium text-text-secondary">
                        <li>• Windows 10/11 or Linux</li>
                        <li>• 4GB RAM minimum (8GB recommended)</li>
                        <li>• 1GB available disk space</li>
                        <li>• Internet connection for activation</li>
                        <li>• USB port for hardware interface</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="heading-3 mb-4">Compatibility</h4>
                      <ul className="space-y-2 body-medium text-text-secondary">
                        <li>• Major banking systems</li>
                        <li>• ATM networks worldwide</li>
                        <li>• Multiple currency formats</li>
                        <li>• Encrypted communication protocols</li>
                        <li>• Real-time transaction processing</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'support' && (
              <div>
                <h3 className="heading-2 mb-8 text-center">Support & Documentation</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-bg-secondary border border-border-subtle p-6">
                    <h4 className="heading-3 mb-4">What's Included</h4>
                    <ul className="space-y-3 body-medium text-text-secondary">
                      <li className="flex items-center gap-2">
                        <Check className="text-brand-primary" size={16} />
                        Complete user manual
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="text-brand-primary" size={16} />
                        Video tutorials
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="text-brand-primary" size={16} />
                        Setup assistance
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="text-brand-primary" size={16} />
                        {product.tier === 'lite' ? 'Email support' : 
                         product.tier === 'pro' ? '24/7 priority support' : 
                         'VIP instant response support'}
                      </li>
                    </ul>
                  </div>
                  <div className="bg-bg-secondary border border-border-subtle p-6">
                    <h4 className="heading-3 mb-4">Support Channels</h4>
                    <ul className="space-y-3 body-medium text-text-secondary">
                      <li>📧 Email: support@sqr400flashfund.com</li>
                      <li>💬 Telegram: @Sqr400_FlashFund</li>
                      <li>📱 WhatsApp: +1 (321) 306-8574</li>
                      {product.tier !== 'lite' && (
                        <li>📞 Phone: 24/7 hotline</li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="dark-full-container py-20">
        <div className="dark-content-container">
          <div className="text-center mb-12">
            <h2 className="display-large mb-6">What Users Say</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {productTestimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-bg-secondary border border-border-subtle p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="text-brand-primary" size={16} fill="currentColor" />
                  ))}
                </div>
                
                <p className="body-medium text-text-secondary mb-6">
                  "{testimonial.comment}"
                </p>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-brand-hover border border-brand-primary/20 flex items-center justify-center text-brand-primary font-bold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="body-small font-medium text-text-primary">{testimonial.name}</div>
                    <div className="body-small text-text-muted">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="dark-full-container py-20">
        <div className="dark-content-container">
          <div className="text-center mb-12">
            <h2 className="display-large mb-6">Other Versions</h2>
            <p className="body-large text-text-secondary">
              Explore other SQR400 versions that might suit your needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {relatedProducts.map((relatedProduct) => (
              <div key={relatedProduct.id} className="bg-bg-secondary border border-border-subtle p-6 dark-transition dark-hover">
                <h3 className="heading-3 mb-2">{relatedProduct.name}</h3>
                <p className="body-medium text-text-secondary mb-4">{relatedProduct.description}</p>
                
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="heading-2 text-brand-primary">${relatedProduct.price}</span>
                  <span className="body-small text-text-muted">₿{relatedProduct.btcPrice}</span>
                </div>

                <Link to={`/product/${relatedProduct.id}`} className="btn-primary w-full text-center">
                  View Details <ArrowRight size={16} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetailPage;