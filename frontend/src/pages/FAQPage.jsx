import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search, HelpCircle, Shield, CreditCard, Users } from 'lucide-react';
import { mockFAQs } from '../mock';

const FAQPage = () => {
  const [openFAQ, setOpenFAQ] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', label: 'All Questions', icon: HelpCircle },
    { id: 'legal', label: 'Legal & Compliance', icon: Shield },
    { id: 'purchase', label: 'Purchase & Payment', icon: CreditCard },
    { id: 'features', label: 'Features & Versions', icon: Users },
    { id: 'support', label: 'Support & Help', icon: Users },
    { id: 'effectiveness', label: 'Performance', icon: Users }
  ];

  // Filter FAQs based on category and search term
  const filteredFAQs = mockFAQs.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFAQ = (id) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <div className="relative">
      {/* Header Section */}
      <section className="dark-full-container py-20">
        <div className="dark-content-container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="display-huge mb-6">Frequently Asked Questions</h1>
            <p className="body-large text-text-secondary mb-12 max-w-2xl mx-auto">
              Find answers to common questions about SQR400 flash software, pricing, features, and support.
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-muted" size={20} />
              <input
                type="text"
                placeholder="Search questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-bg-secondary border border-border-subtle text-text-primary placeholder-text-muted focus:outline-none focus:border-brand-primary transition-colors"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="dark-full-container py-10">
        <div className="dark-content-container">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-brand-primary text-black'
                      : 'bg-bg-secondary text-text-secondary hover:text-text-primary border border-border-subtle'
                  }`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <Icon size={16} />
                  {category.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ List */}
      <section className="dark-full-container py-20">
        <div className="dark-content-container">
          <div className="max-w-4xl mx-auto">
            {filteredFAQs.length > 0 ? (
              <div className="space-y-4">
                {filteredFAQs.map((faq) => (
                  <div key={faq.id} className="bg-bg-secondary border border-border-subtle">
                    <button
                      className="w-full p-6 text-left flex items-center justify-between hover:bg-bg-overlay transition-colors"
                      onClick={() => toggleFAQ(faq.id)}
                    >
                      <h3 className="heading-3 pr-4">{faq.question}</h3>
                      {openFAQ === faq.id ? (
                        <ChevronUp className="text-brand-primary flex-shrink-0" size={24} />
                      ) : (
                        <ChevronDown className="text-text-muted flex-shrink-0" size={24} />
                      )}
                    </button>
                    
                    {openFAQ === faq.id && (
                      <div className="px-6 pb-6 border-t border-border-subtle">
                        <div className="pt-4">
                          <p className="body-medium text-text-secondary leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <HelpCircle className="mx-auto mb-4 text-text-muted" size={48} />
                <h3 className="heading-2 mb-2">No questions found</h3>
                <p className="body-medium text-text-muted mb-6">
                  Try adjusting your search terms or browse all categories.
                </p>
                <button 
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                  }}
                  className="btn-primary"
                >
                  Show All Questions
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="dark-full-container py-20">
        <div className="dark-content-container">
          <div className="bg-bg-secondary border border-border-subtle p-12 text-center max-w-2xl mx-auto">
            <h2 className="display-large mb-6">Still Need Help?</h2>
            <p className="body-large text-text-secondary mb-8">
              Can't find the answer you're looking for? Our support team is here to help with any questions about SQR400.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="mailto:support@sqr400.com" className="btn-primary">
                Email Support
              </a>
              <a href="#" className="btn-secondary">
                Live Chat
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="dark-full-container py-20">
        <div className="dark-content-container">
          <div className="text-center mb-12">
            <h2 className="display-large mb-6">Popular Resources</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-bg-secondary border border-border-subtle p-6 text-center dark-transition dark-hover">
              <div className="w-16 h-16 bg-brand-hover border border-brand-primary/20 flex items-center justify-center mx-auto mb-4">
                <Shield className="text-brand-primary" size={32} />
              </div>
              <h3 className="heading-3 mb-3">Getting Started Guide</h3>
              <p className="body-medium text-text-secondary mb-4">
                Complete setup and installation instructions for new users.
              </p>
              <a href="#" className="btn-secondary w-full">
                View Guide
              </a>
            </div>
            
            <div className="bg-bg-secondary border border-border-subtle p-6 text-center dark-transition dark-hover">
              <div className="w-16 h-16 bg-brand-hover border border-brand-primary/20 flex items-center justify-center mx-auto mb-4">
                <CreditCard className="text-brand-primary" size={32} />
              </div>
              <h3 className="heading-3 mb-3">Payment Methods</h3>
              <p className="body-medium text-text-secondary mb-4">
                Learn about Bitcoin payments and our secure checkout process.
              </p>
              <a href="#" className="btn-secondary w-full">
                Learn More
              </a>
            </div>
            
            <div className="bg-bg-secondary border border-border-subtle p-6 text-center dark-transition dark-hover">
              <div className="w-16 h-16 bg-brand-hover border border-brand-primary/20 flex items-center justify-center mx-auto mb-4">
                <Users className="text-brand-primary" size={32} />
              </div>
              <h3 className="heading-3 mb-3">Video Tutorials</h3>
              <p className="body-medium text-text-secondary mb-4">
                Step-by-step video guides for all SQR400 features and functions.
              </p>
              <a href="#" className="btn-secondary w-full">
                Watch Now
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQPage;