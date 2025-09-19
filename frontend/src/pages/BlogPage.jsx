import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, User, Tag } from 'lucide-react';
import { mockBlogPosts } from '../mock';

const BlogPage = () => {
  const [selectedTag, setSelectedTag] = useState('all');
  
  // Get all unique tags
  const allTags = ['all', ...new Set(mockBlogPosts.flatMap(post => post.tags))];
  
  // Filter posts based on selected tag
  const filteredPosts = selectedTag === 'all' 
    ? mockBlogPosts 
    : mockBlogPosts.filter(post => post.tags.includes(selectedTag));

  const featuredPost = mockBlogPosts.find(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <div className="relative">
      {/* Header Section */}
      <section className="dark-full-container py-20">
        <div className="dark-content-container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="display-huge mb-6">SQR400 Knowledge Hub</h1>
            <p className="body-large text-text-secondary mb-12 max-w-2xl mx-auto">
              Stay updated with the latest insights, tutorials, and industry news about SQR400 flash software and security testing.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      {featuredPost && (
        <section className="dark-full-container py-20">
          <div className="dark-content-container">
            <div className="mb-8">
              <span className="px-4 py-2 bg-brand-hover text-brand-primary text-sm font-medium border border-brand-primary/20">
                Featured Article
              </span>
            </div>
            
            <div className="bg-bg-secondary border border-border-subtle p-8 dark-transition dark-hover">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-2 text-text-muted body-small">
                      <User size={16} />
                      <span>{featuredPost.author}</span>
                    </div>
                    <div className="flex items-center gap-2 text-text-muted body-small">
                      <Clock size={16} />
                      <span>{featuredPost.readTime}</span>
                    </div>
                  </div>
                  
                  <h2 className="display-medium mb-4">{featuredPost.title}</h2>
                  <p className="body-large text-text-secondary mb-6">{featuredPost.excerpt}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {featuredPost.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-brand-hover text-brand-primary text-sm border border-brand-primary/20">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <Link to={`/blog/${featuredPost.slug}`} className="btn-primary">
                    Read Article <ArrowRight size={20} />
                  </Link>
                </div>
                
                <div className="bg-bg-primary p-8 border border-border-subtle">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-brand-hover border border-brand-primary/20 flex items-center justify-center mx-auto mb-4">
                      <Tag className="text-brand-primary" size={32} />
                    </div>
                    <h3 className="heading-3 mb-2">Featured Content</h3>
                    <p className="body-medium text-text-secondary">
                      Our most comprehensive guide to understanding SQR400 technology and its applications.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Tag Filter */}
      <section className="dark-full-container py-10">
        <div className="dark-content-container">
          <div className="flex flex-wrap gap-3 justify-center">
            {allTags.map((tag) => (
              <button
                key={tag}
                className={`px-4 py-2 text-sm font-medium transition-colors capitalize ${
                  selectedTag === tag
                    ? 'bg-brand-primary text-black'
                    : 'bg-bg-secondary text-text-secondary hover:text-text-primary border border-border-subtle'
                }`}
                onClick={() => setSelectedTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="dark-full-container py-20">
        <div className="dark-content-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post) => (
              <article key={post.id} className="bg-bg-secondary border border-border-subtle p-6 dark-transition dark-hover">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-2 text-text-muted body-small">
                    <User size={14} />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-2 text-text-muted body-small">
                    <Clock size={14} />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                
                <h3 className="heading-3 mb-3">{post.title}</h3>
                <p className="body-medium text-text-secondary mb-4">{post.excerpt}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {post.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-brand-hover text-brand-primary text-xs border border-brand-primary/20">
                      {tag}
                    </span>
                  ))}
                  {post.tags.length > 2 && (
                    <span className="px-2 py-1 text-text-muted text-xs">
                      +{post.tags.length - 2}
                    </span>
                  )}
                </div>
                
                <Link to={`/blog/${post.slug}`} className="btn-secondary w-full text-center">
                  Read More <ArrowRight size={16} />
                </Link>
              </article>
            ))}
          </div>
          
          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="body-large text-text-muted">No articles found for the selected tag.</p>
              <button 
                onClick={() => setSelectedTag('all')}
                className="btn-primary mt-4"
              >
                View All Articles
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="dark-full-container py-20">
        <div className="dark-content-container">
          <div className="bg-bg-secondary border border-border-subtle p-12 text-center max-w-2xl mx-auto">
            <h2 className="display-large mb-6">Stay Informed</h2>
            <p className="body-large text-text-secondary mb-8">
              Subscribe to our newsletter for the latest SQR400 updates, security insights, and industry news.
            </p>
            <form className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 bg-bg-primary border border-border-subtle text-text-primary placeholder-text-muted focus:outline-none focus:border-brand-primary transition-colors"
                required
              />
              <button type="submit" className="btn-primary">
                Subscribe <ArrowRight size={20} />
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;