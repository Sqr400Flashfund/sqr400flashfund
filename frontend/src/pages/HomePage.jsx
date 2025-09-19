import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Zap, Star, TrendingUp, Users } from 'lucide-react';
import { useApi } from '../hooks/useApi';
import { productService, testimonialService, statsService } from '../services/api';

const HomePage = () => {
  // Fetch data from API
  const { data: products, loading: productsLoading } = useApi(() => productService.getAll());
  const { data: testimonials, loading: testimonialsLoading } = useApi(() => testimonialService.getAll());
  const { data: stats, loading: statsLoading } = useApi(() => statsService.get());

  const featuredProducts = products?.slice(0, 3) || [];

  if (productsLoading || testimonialsLoading || statsLoading) {
    return (
      <div className="dark-full-container py-20">
        <div className="dark-content-container text-center">
          <div className="display-large text-brand-primary mb-4">Loading...</div>
          <p className="body-large text-text-secondary">Loading SQR400 data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="dark-full-container py-32">
        <div className="dark-content-container">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6">
              <span className="px-4 py-2 bg-brand-hover text-brand-primary text-sm font-medium border border-brand-primary/20">
                Latest Version v7.8.4 Available
              </span>
            </div>
            <h1 className="display-huge mb-6">
              Professional SQR400 
              <span className="text-brand-primary"> Flash Software</span>
            </h1>
            <p className="body-large text-text-secondary mb-12 max-w-2xl mx-auto">
              The most advanced flash software solution trusted by security professionals worldwide. 
              Get instant access to cutting-edge banking system tools with military-grade security.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/products" className="btn-primary">
                View All Products <ArrowRight size={20} />
              </Link>
              <Link to="/blog/what-is-sqr400-complete-guide" className="btn-secondary">
                Learn More <Shield size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="dark-full-container py-20">
        <div className="dark-content-container">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
            <div className="text-center">
              <div className="display-medium text-brand-primary mb-2">{stats?.total_users || '50,000+'}</div>
              <div className="body-small text-text-muted">Active Users</div>
            </div>
            <div className="text-center">
              <div className="display-medium text-brand-primary mb-2">{stats?.success_rate || '99.7%'}</div>
              <div className="body-small text-text-muted">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="display-medium text-brand-primary mb-2">{stats?.countries_served || '120+'}</div>
              <div className="body-small text-text-muted">Countries</div>
            </div>
            <div className="text-center">
              <div className="display-medium text-brand-primary mb-2">{stats?.years_experience || '8+'}</div>
              <div className="body-small text-text-muted">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="display-medium text-brand-primary mb-2">{stats?.transactions_processed || '2.5M+'}</div>
              <div className="body-small text-text-muted">Transactions</div>
            </div>
            <div className="text-center">
              <div className="display-medium text-brand-primary mb-2">{stats?.support_rating || '4.9/5'}</div>
              <div className="body-small text-text-muted">Support Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="dark-full-container py-20">
        <div className="dark-content-container">
          <div className="text-center mb-16">
            <h2 className="display-large mb-6">Choose Your SQR400 Version</h2>
            <p className="body-large text-text-secondary max-w-2xl mx-auto">
              From beginners to professionals, we have the perfect SQR400 solution for your needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="bg-bg-secondary border border-border-subtle p-8 dark-transition dark-hover relative">
                {product.badge && (
                  <div className="absolute top-4 right-4 px-3 py-1 bg-brand-primary text-black text-sm font-medium">
                    {product.badge}
                  </div>
                )}
                
                <div className="mb-6">
                  <h3 className="heading-2 mb-2">{product.name}</h3>
                  <p className="body-medium text-text-secondary mb-4">{product.description}</p>
                  
                  <div className="flex items-baseline gap-2 mb-6">
                    <span className="display-medium text-brand-primary">${product.price}</span>
                    {product.originalPrice > product.price && (
                      <span className="body-medium text-text-muted line-through">${product.originalPrice}</span>
                    )}
                  </div>

                  <div className="space-y-2 mb-8">
                    {product.features.slice(0, 4).map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-brand-primary"></div>
                        <span className="body-small text-text-secondary">{feature}</span>
                      </div>
                    ))}
                    {product.features.length > 4 && (
                      <div className="text-text-muted body-small">
                        +{product.features.length - 4} more features
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <Link to={`/product/${product.id}`} className="btn-primary w-full text-center">
                    View Details
                  </Link>
                  <Link to={`/checkout/${product.id}`} className="btn-secondary w-full text-center">
                    Buy Now - ₿{product.btcPrice}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="dark-full-container py-20">
        <div className="dark-content-container">
          <div className="text-center mb-16">
            <h2 className="display-large mb-6">Why Choose SQR400?</h2>
            <p className="body-large text-text-secondary max-w-2xl mx-auto">
              Industry-leading features that set us apart from the competition
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-brand-hover border border-brand-primary/20 flex items-center justify-center mx-auto mb-6">
                <Shield className="text-brand-primary" size={32} />
              </div>
              <h3 className="heading-3 mb-4">Military-Grade Security</h3>
              <p className="body-medium text-text-secondary">
                Advanced encryption and stealth protocols protect your operations from detection and interference.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-brand-hover border border-brand-primary/20 flex items-center justify-center mx-auto mb-6">
                <Zap className="text-brand-primary" size={32} />
              </div>
              <h3 className="heading-3 mb-4">Lightning Fast Processing</h3>
              <p className="body-medium text-text-secondary">
                Optimized algorithms ensure rapid transaction processing with minimal system resource usage.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-brand-hover border border-brand-primary/20 flex items-center justify-center mx-auto mb-6">
                <Users className="text-brand-primary" size={32} />
              </div>
              <h3 className="heading-3 mb-4">24/7 Expert Support</h3>
              <p className="body-medium text-text-secondary">
                Professional support team available around the clock to assist with any technical challenges.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="dark-full-container py-20">
        <div className="dark-content-container">
          <div className="text-center mb-16">
            <h2 className="display-large mb-6">Trusted by Professionals</h2>
            <p className="body-large text-text-secondary max-w-2xl mx-auto">
              See what security experts and professionals say about SQR400
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials?.map((testimonial) => (
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

      {/* CTA Section */}
      <section className="dark-full-container py-20">
        <div className="dark-content-container">
          <div className="bg-bg-secondary border border-border-subtle p-12 text-center">
            <h2 className="display-large mb-6">Ready to Get Started?</h2>
            <p className="body-large text-text-secondary mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who trust SQR400 for their security testing needs. 
              Start with our most popular version today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/product/sqr400-v58-pro" className="btn-primary">
                Get SQR400 Pro <TrendingUp size={20} />
              </Link>
              <Link to="/contact" className="btn-secondary">
                Contact Sales <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;