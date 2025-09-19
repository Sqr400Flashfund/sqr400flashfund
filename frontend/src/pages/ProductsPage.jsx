import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, X } from 'lucide-react';
import { useApi } from '../hooks/useApi';
import { productService } from '../services/api';

const ProductsPage = () => {
  const [selectedComparison, setSelectedComparison] = useState('features');
  
  // Fetch products from API
  const { data: products, loading } = useApi(() => productService.getAll());

  if (loading) {
    return (
      <div className="dark-full-container py-20">
        <div className="dark-content-container text-center">
          <div className="display-large text-brand-primary mb-4">Loading...</div>
          <p className="body-large text-text-secondary">Loading products...</p>
        </div>
      </div>
    );
  }

  const comparisonData = {
    features: [
      { name: 'Basic ATM Flash', lite: true, pro: true, ultimate: true },
      { name: 'Advanced Security Protocols', lite: false, pro: true, ultimate: true },
      { name: 'Unlimited Transactions', lite: false, pro: true, ultimate: true },
      { name: 'AI-Powered Optimization', lite: false, pro: false, ultimate: true },
      { name: 'Stealth Mode', lite: false, pro: false, ultimate: true },
      { name: 'Multi-Currency Support', lite: false, pro: false, ultimate: true },
      { name: 'API Integration', lite: false, pro: false, ultimate: true },
      { name: 'Custom Scripting', lite: false, pro: false, ultimate: true },
      { name: 'Real-time Analytics', lite: false, pro: false, ultimate: true },
      { name: 'Beta Access', lite: false, pro: false, ultimate: true }
    ],
    support: [
      { name: 'Email Support', lite: true, pro: true, ultimate: true },
      { name: 'Priority Support (24/7)', lite: false, pro: true, ultimate: true },
      { name: 'VIP Instant Response', lite: false, pro: false, ultimate: true },
      { name: 'Phone Support', lite: false, pro: true, ultimate: true },
      { name: 'Dedicated Account Manager', lite: false, pro: false, ultimate: true },
      { name: 'Training Sessions', lite: false, pro: false, ultimate: true }
    ],
    updates: [
      { name: 'Regular Updates', lite: true, pro: true, ultimate: true },
      { name: 'Lifetime Updates', lite: false, pro: true, ultimate: true },
      { name: 'Beta Access', lite: false, pro: false, ultimate: true },
      { name: 'Early Feature Access', lite: false, pro: false, ultimate: true },
      { name: 'Custom Feature Requests', lite: false, pro: false, ultimate: true }
    ]
  };

  return (
    <div className="relative">
      {/* Header Section */}
      <section className="dark-full-container py-20">
        <div className="dark-content-container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="display-huge mb-6">SQR400 Product Suite</h1>
            <p className="body-large text-text-secondary mb-12 max-w-2xl mx-auto">
              Compare all SQR400 versions and find the perfect solution for your professional needs. 
              From basic functionality to enterprise-grade features.
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="dark-full-container py-20">
        <div className="dark-content-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {products?.map((product) => (
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
                    {product.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-brand-primary"></div>
                        <span className="body-small text-text-secondary">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {product.limitations.length > 0 && (
                    <div className="border-t border-border-subtle pt-4 mb-6">
                      <h4 className="body-small text-text-muted mb-2 font-medium">Limitations:</h4>
                      <div className="space-y-1">
                        {product.limitations.map((limitation, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <X size={12} className="text-text-muted" />
                            <span className="body-small text-text-muted">{limitation}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <Link to={`/product/${product.id}`} className="btn-primary w-full text-center">
                    View Details <ArrowRight size={16} />
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

      {/* Comparison Table */}
      <section className="dark-full-container py-20">
        <div className="dark-content-container">
          <div className="text-center mb-12">
            <h2 className="display-large mb-6">Detailed Comparison</h2>
            <p className="body-large text-text-secondary mb-8">
              Compare features, support options, and update policies across all versions
            </p>
            
            {/* Comparison Toggle */}
            <div className="flex justify-center mb-8">
              <div className="flex bg-bg-secondary border border-border-subtle">
                {Object.keys(comparisonData).map((key) => (
                  <button
                    key={key}
                    className={`px-6 py-3 body-medium capitalize transition-colors ${
                      selectedComparison === key
                        ? 'bg-brand-primary text-black'
                        : 'text-text-secondary hover:text-text-primary'
                    }`}
                    onClick={() => setSelectedComparison(key)}
                  >
                    {key}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="overflow-x-auto">
            <table className="w-full border border-border-subtle">
              <thead>
                <tr className="bg-bg-secondary">
                  <th className="text-left p-4 body-medium text-text-primary border-r border-border-subtle">
                    {selectedComparison.charAt(0).toUpperCase() + selectedComparison.slice(1)}
                  </th>
                  <th className="text-center p-4 body-medium text-text-primary border-r border-border-subtle">
                    Lite v5.8
                  </th>
                  <th className="text-center p-4 body-medium text-text-primary border-r border-border-subtle">
                    Pro v5.8
                  </th>
                  <th className="text-center p-4 body-medium text-text-primary">
                    Ultimate v7.8.4
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonData[selectedComparison].map((item, index) => (
                  <tr key={index} className="border-t border-border-subtle">
                    <td className="p-4 body-small text-text-secondary border-r border-border-subtle">
                      {item.name}
                    </td>
                    <td className="text-center p-4 border-r border-border-subtle">
                      {item.lite ? (
                        <Check className="text-brand-primary mx-auto" size={20} />
                      ) : (
                        <X className="text-text-muted mx-auto" size={20} />
                      )}
                    </td>
                    <td className="text-center p-4 border-r border-border-subtle">
                      {item.pro ? (
                        <Check className="text-brand-primary mx-auto" size={20} />
                      ) : (
                        <X className="text-text-muted mx-auto" size={20} />
                      )}
                    </td>
                    <td className="text-center p-4">
                      {item.ultimate ? (
                        <Check className="text-brand-primary mx-auto" size={20} />
                      ) : (
                        <X className="text-text-muted mx-auto" size={20} />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="dark-full-container py-20">
        <div className="dark-content-container">
          <div className="bg-bg-secondary border border-border-subtle p-12 text-center">
            <h2 className="display-large mb-6">Not Sure Which Version to Choose?</h2>
            <p className="body-large text-text-secondary mb-8 max-w-2xl mx-auto">
              Our experts can help you select the perfect SQR400 version based on your specific requirements and use case.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="btn-primary">
                Get Expert Advice <ArrowRight size={20} />
              </Link>
              <Link to="/faq" className="btn-secondary">
                View FAQ
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;