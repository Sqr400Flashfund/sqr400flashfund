import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, User, Share2, Tag } from 'lucide-react';
import { mockBlogPosts } from '../mock';

const BlogPostPage = () => {
  const { slug } = useParams();
  const post = mockBlogPosts.find(p => p.slug === slug);
  const relatedPosts = mockBlogPosts.filter(p => p.slug !== slug).slice(0, 2);

  if (!post) {
    return (
      <div className="dark-full-container py-20">
        <div className="dark-content-container text-center">
          <h1 className="display-large mb-6">Article Not Found</h1>
          <Link to="/blog" className="btn-primary">
            Back to Blog <ArrowLeft size={20} />
          </Link>
        </div>
      </div>
    );
  }

  // Mock expanded content based on the post title
  const getExpandedContent = (post) => {
    if (post.slug === 'what-is-sqr400-complete-guide') {
      return `
        <h2>Understanding SQR400 Technology</h2>
        <p>SQR400 represents the cutting-edge of flash software technology, designed specifically for security professionals and financial institutions. This comprehensive software suite provides advanced tools for testing banking systems, ATM networks, and financial transaction processing systems.</p>
        
        <h3>Core Components</h3>
        <p>The SQR400 platform consists of several integrated modules:</p>
        <ul>
          <li><strong>Flash Engine:</strong> The core processing unit that handles transaction simulation and system interaction</li>
          <li><strong>Security Layer:</strong> Advanced encryption and stealth protocols to ensure safe testing environments</li>
          <li><strong>Interface Module:</strong> User-friendly control panel for managing operations and configurations</li>
          <li><strong>Analytics Dashboard:</strong> Real-time monitoring and reporting capabilities</li>
        </ul>
        
        <h3>Key Advantages</h3>
        <p>What sets SQR400 apart from competitors like those found on sqr400.net or sqr400officialsite.com is our commitment to:</p>
        <ul>
          <li>Continuous innovation and regular updates</li>
          <li>Military-grade security protocols</li>
          <li>Professional support and documentation</li>
          <li>Multi-platform compatibility</li>
        </ul>
        
        <h2>Applications and Use Cases</h2>
        <p>SQR400 software is primarily used by:</p>
        <ul>
          <li>Security researchers and penetration testers</li>
          <li>Financial institutions for system validation</li>
          <li>Compliance teams for regulatory testing</li>
          <li>Educational institutions for cybersecurity training</li>
        </ul>
        
        <h3>Getting Started</h3>
        <p>To begin using SQR400, we recommend starting with our Lite version to familiarize yourself with the interface and basic functionality. Professional users typically upgrade to Pro or Ultimate versions for advanced features and unlimited transaction capabilities.</p>
      `;
    } else if (post.slug === 'sqr400-vs-competition-market-leader') {
      return `
        <h2>Market Analysis: SQR400 Leadership</h2>
        <p>In the competitive landscape of flash software solutions, SQR400 has established itself as the clear market leader through superior technology, comprehensive support, and continuous innovation.</p>
        
        <h3>Comparison with Major Competitors</h3>
        <p>When comparing SQR400 to alternatives available on sqr400.net and sqr400officialsite.com, several key differentiators emerge:</p>
        
        <h4>Technology Superiority</h4>
        <ul>
          <li><strong>Advanced AI Integration:</strong> Our v7.8.4 includes AI-powered optimization, unavailable in competitor solutions</li>
          <li><strong>Stealth Capabilities:</strong> Enhanced concealment protocols that outperform traditional approaches</li>
          <li><strong>Multi-Currency Support:</strong> Comprehensive support for global financial systems</li>
        </ul>
        
        <h4>Support and Documentation</h4>
        <p>While competitors often provide minimal support, SQR400 offers:</p>
        <ul>
          <li>24/7 professional support for Pro and Ultimate users</li>
          <li>Comprehensive documentation and video tutorials</li>
          <li>Regular training sessions and webinars</li>
          <li>Dedicated account management for enterprise users</li>
        </ul>
        
        <h3>Customer Satisfaction Metrics</h3>
        <p>Our commitment to excellence is reflected in our industry-leading metrics:</p>
        <ul>
          <li>99.7% customer satisfaction rate</li>
          <li>4.9/5 support rating</li>
          <li>50,000+ active users worldwide</li>
          <li>95% customer retention rate</li>
        </ul>
        
        <h2>Future Roadmap</h2>
        <p>SQR400 continues to evolve with planned features including enhanced machine learning capabilities, expanded blockchain integration, and improved user interface design.</p>
      `;
    } else {
      return `
        <h2>Evolution of SQR400 Versions</h2>
        <p>The journey of SQR400 development showcases continuous innovation and response to user feedback. Each version builds upon previous achievements while introducing groundbreaking new capabilities.</p>
        
        <h3>Version 5.8 Series</h3>
        <p>The 5.8 series introduced the foundation of modern SQR400 technology:</p>
        <ul>
          <li><strong>v5.8 Lite:</strong> Established the core architecture and basic functionality</li>
          <li><strong>v5.8 Pro:</strong> Added professional features and unlimited transaction capabilities</li>
        </ul>
        
        <h3>The Revolutionary v7.8.4</h3>
        <p>Our latest version represents a quantum leap in flash software technology:</p>
        <ul>
          <li>AI-powered transaction optimization</li>
          <li>Advanced stealth mode capabilities</li>
          <li>Real-time market integration</li>
          <li>Custom scripting support</li>
          <li>Enhanced analytics dashboard</li>
        </ul>
        
        <h3>Choosing the Right Version</h3>
        <p>Selection depends on your specific needs:</p>
        <ul>
          <li><strong>Beginners:</strong> Start with v5.8 Lite for basic functionality</li>
          <li><strong>Professionals:</strong> v5.8 Pro offers unlimited capabilities</li>
          <li><strong>Experts:</strong> v7.8.4 provides cutting-edge features</li>
        </ul>
      `;
    }
  };

  return (
    <div className="relative">
      {/* Back Navigation */}
      <section className="dark-full-container py-8">
        <div className="dark-content-container">
          <Link to="/blog" className="flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors body-medium">
            <ArrowLeft size={20} />
            Back to Blog
          </Link>
        </div>
      </section>

      {/* Article Header */}
      <section className="dark-full-container py-20">
        <div className="dark-content-container">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex items-center gap-2 text-text-muted body-small">
                  <User size={16} />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-2 text-text-muted body-small">
                  <Clock size={16} />
                  <span>{post.readTime}</span>
                </div>
                <div className="text-text-muted body-small">
                  {new Date(post.publishDate).toLocaleDateString()}
                </div>
              </div>
              
              <h1 className="display-huge mb-6">{post.title}</h1>
              
              <div className="flex flex-wrap gap-2 mb-8">
                {post.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-brand-hover text-brand-primary text-sm border border-brand-primary/20">
                    <Tag size={12} className="inline mr-1" />
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center justify-between border-t border-border-subtle pt-6">
                <p className="body-large text-text-secondary">{post.excerpt}</p>
                <button className="btn-secondary flex items-center gap-2">
                  <Share2 size={16} />
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="dark-full-container py-20">
        <div className="dark-content-container">
          <div className="max-w-4xl mx-auto">
            <div 
              className="prose prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: getExpandedContent(post) }}
              style={{
                color: 'var(--text-secondary)',
                lineHeight: '1.6'
              }}
            />
          </div>
        </div>
      </section>

      {/* Article Actions */}
      <section className="dark-full-container py-20">
        <div className="dark-content-container">
          <div className="max-w-4xl mx-auto">
            <div className="bg-bg-secondary border border-border-subtle p-8 text-center">
              <h3 className="heading-2 mb-4">Ready to Get Started with SQR400?</h3>
              <p className="body-large text-text-secondary mb-6">
                Explore our product lineup and find the perfect SQR400 solution for your needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/products" className="btn-primary">
                  View Products
                </Link>
                <Link to="/contact" className="btn-secondary">
                  Contact Sales
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      <section className="dark-full-container py-20">
        <div className="dark-content-container">
          <div className="max-w-4xl mx-auto">
            <h2 className="display-large mb-12 text-center">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedPosts.map((relatedPost) => (
                <article key={relatedPost.id} className="bg-bg-secondary border border-border-subtle p-6 dark-transition dark-hover">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-2 text-text-muted body-small">
                      <User size={14} />
                      <span>{relatedPost.author}</span>
                    </div>
                    <div className="flex items-center gap-2 text-text-muted body-small">
                      <Clock size={14} />
                      <span>{relatedPost.readTime}</span>
                    </div>
                  </div>
                  
                  <h3 className="heading-3 mb-3">{relatedPost.title}</h3>
                  <p className="body-medium text-text-secondary mb-6">{relatedPost.excerpt}</p>
                  
                  <Link to={`/blog/${relatedPost.slug}`} className="btn-secondary w-full text-center">
                    Read Article
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPostPage;