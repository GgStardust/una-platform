import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Calendar, User, Clock, ArrowLeft, Share2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import SEOHead from '../components/SEOHead';
import { ResponsiveText } from '@/components/ui';

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  content: string;
  tags: string[];
  created_at: string;
  updated_at: string;
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadBlogPost();
  }, [slug]);

  const loadBlogPost = async () => {
    if (!slug) {
      setError('No slug provided');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error) throw error;
      setPost(data);
    } catch (err) {
      console.error('Error loading blog post:', err);
      setError('Failed to load blog post');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C49A6C] mx-auto"></div>
          <p className="mt-4 text-navy-900">Loading blog post...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
      <SEOHead
        title={post.title}
        description={post.content.substring(0, 160)}
        keywords={post.tags}
        ogType="article"
        schema={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": post.title,
          "description": post.content.substring(0, 160),
          "author": {
            "@type": "Person",
            "name": "UNA Platform Team"
          },
          "publisher": {
            "@type": "Organization",
            "name": "UNA Formation Platform"
          },
          "datePublished": post.created_at,
          "dateModified": post.updated_at,
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
                <span className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {Math.ceil(post.content.length / 1000)} min read
                </span>
              </div>

              <ResponsiveText variant="h1" weight="bold" className="text-navy-900 mb-6 leading-tight">
                {post.title}
              </ResponsiveText>

              <div className="flex items-center justify-center space-x-6 text-sm text-navy-500">
                <span className="flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  UNA Platform Team
                </span>
                <span className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  {formatDate(post.created_at)}
                </span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {post.tags.map((tag, index) => (
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
      </div>
    </>
  );
}
