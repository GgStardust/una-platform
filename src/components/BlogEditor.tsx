import { useState, useEffect } from 'react';
import { X, Save, Eye, Tag, Image as ImageIcon } from 'lucide-react';
import { Blog, createBlog, updateBlog } from '@/lib/supabase/blogs';

interface BlogEditorProps {
  blog?: Blog;
  onClose: () => void;
  onSave: () => void;
}

export default function BlogEditor({ blog, onClose, onSave }: BlogEditorProps) {
  const [formData, setFormData] = useState<Partial<Blog>>({
    slug: '',
    title: '',
    content: '',
    excerpt: '',
    tags: [],
    author: '',
    featured_image: '',
    meta_title: '',
    meta_description: '',
    meta_keywords: [],
    published: false,
  });
  const [tagInput, setTagInput] = useState('');
  const [keywordInput, setKeywordInput] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'content' | 'seo'>('content');

  useEffect(() => {
    if (blog) {
      setFormData(blog);
    }
  }, [blog]);

  const handleChange = (field: keyof Blog, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    // Auto-generate slug from title
    if (field === 'title' && !blog) {
      const slug = value.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      setFormData(prev => ({ ...prev, slug }));
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags?.includes(tagInput.trim())) {
      handleChange('tags', [...(formData.tags || []), tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    handleChange('tags', formData.tags?.filter(t => t !== tag) || []);
  };

  const handleAddKeyword = () => {
    if (keywordInput.trim() && !formData.meta_keywords?.includes(keywordInput.trim())) {
      handleChange('meta_keywords', [...(formData.meta_keywords || []), keywordInput.trim()]);
      setKeywordInput('');
    }
  };

  const handleRemoveKeyword = (keyword: string) => {
    handleChange('meta_keywords', formData.meta_keywords?.filter(k => k !== keyword) || []);
  };

  const handleSave = async () => {
    setIsSaving(true);
    setError(null);

    try {
      // Validation
      if (!formData.title?.trim()) {
        setError('Title is required');
        setIsSaving(false);
        return;
      }
      if (!formData.slug?.trim()) {
        setError('Slug is required');
        setIsSaving(false);
        return;
      }
      if (!formData.content?.trim()) {
        setError('Content is required');
        setIsSaving(false);
        return;
      }

      let result;
      if (blog?.id) {
        result = await updateBlog(blog.id, formData);
      } else {
        result = await createBlog(formData as Omit<Blog, 'id' | 'created_at' | 'updated_at'>);
      }

      if (result.success) {
        onSave();
        onClose();
      } else {
        setError(result.error || 'Failed to save blog');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-5xl my-8">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">
            {blog ? 'Edit Blog Post' : 'Create New Blog Post'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mx-6 mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        {/* Tabs */}
        <div className="flex border-b border-gray-200 px-6">
          <button
            onClick={() => setActiveTab('content')}
            className={`px-4 py-3 font-medium border-b-2 transition-colors ${
              activeTab === 'content'
                ? 'border-[#C49A6C] text-[#C49A6C]'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Content
          </button>
          <button
            onClick={() => setActiveTab('seo')}
            className={`px-4 py-3 font-medium border-b-2 transition-colors ${
              activeTab === 'seo'
                ? 'border-[#C49A6C] text-[#C49A6C]'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            SEO & Meta
          </button>
        </div>

        {/* Content Tab */}
        {activeTab === 'content' && (
          <div className="p-6 space-y-6 max-h-[calc(100vh-300px)] overflow-y-auto">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                value={formData.title || ''}
                onChange={(e) => handleChange('title', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C49A6C] focus:border-transparent"
                placeholder="Enter blog post title"
              />
            </div>

            {/* Slug */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Slug * <span className="text-xs text-gray-500">(URL-friendly identifier)</span>
              </label>
              <input
                type="text"
                value={formData.slug || ''}
                onChange={(e) => handleChange('slug', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C49A6C] focus:border-transparent"
                placeholder="blog-post-url-slug"
              />
            </div>

            {/* Excerpt */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Excerpt
              </label>
              <textarea
                value={formData.excerpt || ''}
                onChange={(e) => handleChange('excerpt', e.target.value)}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C49A6C] focus:border-transparent"
                placeholder="Brief summary for blog listings"
              />
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content * <span className="text-xs text-gray-500">(Markdown supported)</span>
              </label>
              <textarea
                value={formData.content || ''}
                onChange={(e) => handleChange('content', e.target.value)}
                rows={15}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C49A6C] focus:border-transparent font-mono text-sm"
                placeholder="Write your blog content here... Markdown formatting is supported."
              />
            </div>

            {/* Author */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Author
              </label>
              <input
                type="text"
                value={formData.author || ''}
                onChange={(e) => handleChange('author', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C49A6C] focus:border-transparent"
                placeholder="Author name"
              />
            </div>

            {/* Featured Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <ImageIcon className="inline h-4 w-4 mr-1" />
                Featured Image URL
              </label>
              <input
                type="text"
                value={formData.featured_image || ''}
                onChange={(e) => handleChange('featured_image', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C49A6C] focus:border-transparent"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Tag className="inline h-4 w-4 mr-1" />
                Tags
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C49A6C] focus:border-transparent"
                  placeholder="Add a tag and press Enter"
                />
                <button
                  onClick={handleAddTag}
                  type="button"
                  className="px-4 py-2 bg-[#C49A6C] text-white rounded-lg hover:bg-[#B88A5A] transition-colors"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-[#C49A6C]/10 text-[#C49A6C] rounded-full text-sm"
                  >
                    {tag}
                    <button
                      onClick={() => handleRemoveTag(tag)}
                      type="button"
                      className="hover:bg-[#C49A6C]/20 rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Published Status */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="published"
                checked={formData.published || false}
                onChange={(e) => handleChange('published', e.target.checked)}
                className="h-4 w-4 text-[#C49A6C] focus:ring-[#C49A6C] border-gray-300 rounded"
              />
              <label htmlFor="published" className="text-sm font-medium text-gray-700">
                Publish immediately
              </label>
            </div>
          </div>
        )}

        {/* SEO Tab */}
        {activeTab === 'seo' && (
          <div className="p-6 space-y-6 max-h-[calc(100vh-300px)] overflow-y-auto">
            {/* Meta Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Meta Title
                <span className="text-xs text-gray-500 ml-2">(50-60 characters recommended)</span>
              </label>
              <input
                type="text"
                value={formData.meta_title || ''}
                onChange={(e) => handleChange('meta_title', e.target.value)}
                maxLength={60}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C49A6C] focus:border-transparent"
                placeholder="SEO-optimized title for search engines"
              />
              <p className="text-xs text-gray-500 mt-1">
                {formData.meta_title?.length || 0} / 60 characters
              </p>
            </div>

            {/* Meta Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Meta Description
                <span className="text-xs text-gray-500 ml-2">(150-160 characters recommended)</span>
              </label>
              <textarea
                value={formData.meta_description || ''}
                onChange={(e) => handleChange('meta_description', e.target.value)}
                maxLength={160}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C49A6C] focus:border-transparent"
                placeholder="Brief description that appears in search results"
              />
              <p className="text-xs text-gray-500 mt-1">
                {formData.meta_description?.length || 0} / 160 characters
              </p>
            </div>

            {/* Meta Keywords */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Meta Keywords
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={keywordInput}
                  onChange={(e) => setKeywordInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddKeyword())}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C49A6C] focus:border-transparent"
                  placeholder="Add a keyword and press Enter"
                />
                <button
                  onClick={handleAddKeyword}
                  type="button"
                  className="px-4 py-2 bg-[#C49A6C] text-white rounded-lg hover:bg-[#B88A5A] transition-colors"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.meta_keywords?.map((keyword) => (
                  <span
                    key={keyword}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                  >
                    {keyword}
                    <button
                      onClick={() => handleRemoveKeyword(keyword)}
                      type="button"
                      className="hover:bg-blue-200 rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* SEO Preview */}
            <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Search Preview</h4>
              <div className="bg-white p-4 rounded border border-gray-200">
                <div className="text-blue-600 text-lg mb-1">
                  {formData.meta_title || formData.title || 'Your Blog Title'}
                </div>
                <div className="text-green-700 text-sm mb-2">
                  {`${window.location.origin}/blog/${formData.slug || 'your-slug'}`}
                </div>
                <div className="text-gray-600 text-sm">
                  {formData.meta_description || formData.excerpt || 'Your blog description will appear here...'}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            disabled={isSaving}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <div className="flex gap-3">
            <button
              onClick={() => handleChange('published', false)}
              disabled={isSaving}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              <Eye className="h-4 w-4" />
              Save as Draft
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-6 py-2 bg-[#C49A6C] text-white rounded-lg hover:bg-[#B88A5A] transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              <Save className="h-4 w-4" />
              {isSaving ? 'Saving...' : blog ? 'Update Post' : 'Create Post'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
