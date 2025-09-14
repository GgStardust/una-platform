import { useParams, Link } from 'react-router-dom';
import { Calendar, User, Clock, ArrowLeft, Share2 } from 'lucide-react';
import { getBlogPost } from '@/lib/mdx-loader';
import SEOHead from '../components/SEOHead';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogPost(slug) : null;

  if (!post) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-navy-900 mb-4">Post Not Found</h1>
          <p className="text-navy-600 mb-6">The blog post you're looking for doesn't exist.</p>
          <Link to="/blog" className="text-gold-600 hover:text-gold-800 font-medium">
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

    // Function to render markdown content
  const renderContent = (content: string) => {
    const lines = content.split('\n');
    const elements: React.ReactElement[] = [];
    let currentList: React.ReactElement[] = [];

    const flushList = () => {
      if (currentList.length > 0) {
        elements.push(
          <ul key={`list-${elements.length}`} className="pl-6 mb-4 space-y-2">
            {currentList}
          </ul>
        );
        currentList = [];
      }
    };

    lines.forEach((line, index) => {
      const trimmedLine = line.trim();
      
      // Headers
      if (line.startsWith('# ')) {
        flushList();
        elements.push(
                  <h1 key={index} className="text-4xl font-bold text-navy-900 mb-6 mt-8 first:mt-0">
          {line.substring(2)}
        </h1>
      );
      return;
    }
    
    if (line.startsWith('## ')) {
      flushList();
      elements.push(
        <h2 key={index} className="text-3xl font-bold text-navy-900 mb-4 mt-8">
          {line.substring(3)}
        </h2>
      );
      return;
    }
    
    if (line.startsWith('### ')) {
      flushList();
      elements.push(
        <h3 key={index} className="text-2xl font-semibold text-navy-900 mb-3 mt-6">
          {line.substring(4)}
        </h3>
      );
      return;
    }

      // List items
      if (line.startsWith('- ') || line.startsWith('* ')) {
        const listItemContent = line.substring(2);
        
        // Handle bold text within list items
        if (listItemContent.includes('**')) {
          const parts = listItemContent.split('**');
          const formattedContent = parts.map((part, partIndex) => 
            partIndex % 2 === 1 ? <strong key={partIndex}>{part}</strong> : part
          );
          currentList.push(
            <li key={`li-${index}`} className="text-navy-700">
              {formattedContent}
            </li>
          );
        } else {
          currentList.push(
            <li key={`li-${index}`} className="text-navy-700">
              {listItemContent}
            </li>
          );
        }
        return;
      }

      // Numbered list items
      if (/^\d+\.\s/.test(line)) {
        flushList();
        const listItemContent = line.replace(/^\d+\.\s/, '');
        
        if (listItemContent.includes('**')) {
          const parts = listItemContent.split('**');
          const formattedContent = parts.map((part, partIndex) => 
            partIndex % 2 === 1 ? <strong key={partIndex}>{part}</strong> : part
          );
          currentList.push(
            <li key={`li-${index}`} className="text-navy-700">
              {formattedContent}
            </li>
          );
        } else {
          currentList.push(
            <li key={`li-${index}`} className="text-navy-700">
              {listItemContent}
            </li>
          );
        }
        return;
      }

      // Empty lines
      if (trimmedLine === '') {
        flushList();
        elements.push(<div key={`spacer-${index}`} className="h-4"></div>);
        return;
      }

      // Regular paragraphs with bold text
      if (trimmedLine.includes('**')) {
        flushList();
        const parts = trimmedLine.split('**');
        const formattedContent = parts.map((part, partIndex) => 
          partIndex % 2 === 1 ? <strong key={partIndex} className="text-navy-900">{part}</strong> : part
        );
        elements.push(
          <p key={index} className="text-navy-700 mb-4 leading-relaxed">
            {formattedContent}
          </p>
        );
        return;
      }

      // Regular paragraphs
      if (trimmedLine.length > 0) {
        flushList();
        elements.push(
          <p key={index} className="text-navy-700 mb-4 leading-relaxed">
            {trimmedLine}
          </p>
        );
      }
    });

    // Flush any remaining list
    flushList();

    return elements;
  };

  return (
    <>
      <SEOHead
        title={post.frontmatter.title}
        description={post.frontmatter.description}
        keywords={post.frontmatter.tags}
        ogType="article"
        schema={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": post.frontmatter.title,
          "description": post.frontmatter.description,
          "author": {
            "@type": "Person",
            "name": post.frontmatter.author
          },
          "publisher": {
            "@type": "Organization",
            "name": "UNA Formation Platform"
          },
          "datePublished": post.frontmatter.date,
          "dateModified": post.frontmatter.date,
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://unaplatform.com/blog/${post.slug}`
          }
        }}
      />
      <div className="min-h-screen bg-cream-50">
      {/* Navigation */}
      <div className="bg-white border-b border-navy-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link 
            to="/blog" 
            className="text-gold-600 hover:text-gold-800 font-medium flex items-center"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Link>
        </div>
      </div>

      {/* Article Header */}
      <div className="bg-white border-b border-navy-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 text-sm text-navy-500 mb-4">
              <span className="bg-gold-100 text-gold-800 px-3 py-1 rounded-full text-xs font-medium">
                  {post.frontmatter.category}
              </span>
              <span>•</span>
              <span className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                  {post.frontmatter.readTime}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-navy-900 mb-6 leading-tight">
                {post.frontmatter.title}
            </h1>
            
            <p className="text-xl text-navy-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                {post.frontmatter.description}
            </p>
            
            <div className="flex items-center justify-center space-x-6 text-sm text-navy-500">
              <span className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                  {post.frontmatter.author}
              </span>
              <span className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                  {new Date(post.frontmatter.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
              {post.frontmatter.tags.map((tag, index) => (
              <span 
                key={index}
                className="bg-navy-100 text-navy-700 px-3 py-1 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Share Button */}
          <div className="flex justify-center">
            <button className="flex items-center space-x-2 bg-navy-100 hover:bg-navy-200 text-navy-700 px-4 py-2 rounded-lg transition-colors">
              <Share2 className="h-4 w-4" />
              <span>Share Article</span>
            </button>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <article className="prose prose-lg max-w-none">
            <div className="text-navy-800 leading-relaxed">
              {renderContent(post.content)}
            </div>
          </article>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gold-50 border-t border-gold-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-navy-900 mb-4">
              Ready to Form Your UNA the Right Way?
            </h2>
            <p className="text-lg text-navy-600 mb-8 max-w-2xl mx-auto">
              Don't leave your UNA formation to chance. Our California-specific platform provides 
              the professional guidance and comprehensive tools you need.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/intake" 
                className="bg-gold-600 text-white hover:bg-gold-700 font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
              >
                Start Your Formation
              </Link>
              <Link 
                to="/services" 
                className="border-2 border-gold-600 text-gold-600 hover:bg-gold-50 font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
              >
                View Our Services
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Related Articles */}
      <div className="bg-cream-50 border-t border-navy-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h3 className="text-2xl font-bold text-navy-900 mb-8 text-center">
            Continue Your UNA Formation Journey
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h4 className="text-lg font-semibold text-navy-900 mb-3">
                The Legal Pitfalls of Generic UNA Formation
              </h4>
              <p className="text-navy-600 mb-4">
                Learn about the common mistakes that can derail your UNA formation and how to avoid them.
              </p>
                <Link to="/blog/legal-pitfalls-generic-una-formation" className="text-gold-600 hover:text-gold-800 font-medium text-sm">
                Read More →
              </Link>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h4 className="text-lg font-semibold text-navy-900 mb-3">
                California UNA Formation: Complete Legal Compliance Guide
              </h4>
              <p className="text-navy-600 mb-4">
                A comprehensive guide to ensuring your UNA meets all California legal requirements.
              </p>
                <Link to="/blog/california-una-formation-legal-compliance-guide" className="text-gold-600 hover:text-gold-800 font-medium text-sm">
                Read More →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}