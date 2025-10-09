import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Calendar, Tag, ArrowRight } from 'lucide-react';
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

export default function BlogIndex() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBlogs(data || []);
    } catch (err) {
      console.error('Error loading blogs:', err);
      setError('Failed to load blog posts');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-cream-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C49A6C] mx-auto"></div>
            <p className="mt-4 text-navy-900">Loading blog posts...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-cream-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-600">{error}</p>
            <button 
              onClick={loadBlogs}
              className="mt-4 px-4 py-2 bg-[#C49A6C] text-white rounded-md hover:bg-[#A67C52] transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <ResponsiveText variant="h1" weight="bold" className="text-navy-900 mb-4">
            UNA Formation Blog
          </ResponsiveText>
          <ResponsiveText variant="bodyLarge" className="text-navy-700 max-w-2xl mx-auto block">
            Expert guidance on Unincorporated Association formation,
            state requirements, and best practices for your organization.
          </ResponsiveText>
        </div>

        {/* Blog Posts */}
        {blogs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-navy-600 text-lg">No blog posts available yet.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {blogs.map((blog) => (
              <article 
                key={blog.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
              >
                <div className="p-8">
                  <div className="flex items-center text-sm text-navy-600 mb-4">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>Published {formatDate(blog.created_at)}</span>
                    {blog.updated_at !== blog.created_at && (
                      <span className="ml-4">
                        Updated {formatDate(blog.updated_at)}
                      </span>
                    )}
                  </div>
                  
                  <ResponsiveText variant="h2" weight="bold" className="text-navy-900 mb-4">
                    {blog.title}
                  </ResponsiveText>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {blog.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#C49A6C]/10 text-[#C49A6C]"
                      >
                        <Tag className="h-3 w-3 mr-1" />
                        {tag.replace(/-/g, ' ')}
                      </span>
                    ))}
                  </div>

                  <div className="prose prose-navy max-w-none mb-6">
                    <ResponsiveText variant="body" className="text-navy-700 leading-relaxed block">
                      {blog.content.substring(0, 200)}...
                    </ResponsiveText>
                  </div>
                  
                  <Link
                    to={`/blog/${blog.slug}`}
                    className="inline-flex items-center text-[#C49A6C] hover:text-[#A67C52] font-medium transition-colors"
                  >
                    Read More
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
