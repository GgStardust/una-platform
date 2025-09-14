import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, User, ArrowRight, FileText } from 'lucide-react';
import { getAllBlogPosts, BlogPost } from '@/lib/mdx-loader';
import SEOHead from '../components/SEOHead';

export default function Blog() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Load blog posts from MDX files
  useEffect(() => {
    try {
      const posts = getAllBlogPosts();
      setBlogPosts(posts);
      setFilteredPosts(posts);
    } catch (error) {
      console.error('Error loading blog posts:', error);
      setBlogPosts([]);
      setFilteredPosts([]);
    }
  }, []);

  // Get unique categories from blog posts
  const categories = ['all', ...Array.from(new Set(blogPosts.map(post => post.frontmatter.category)))];

  // Filter posts based on search and category
  useEffect(() => {
    const filtered = blogPosts.filter(post => {
      const matchesSearch = post.frontmatter.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.frontmatter.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.frontmatter.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || post.frontmatter.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
    setFilteredPosts(filtered);
  }, [blogPosts, searchTerm, selectedCategory]);

  const featuredPost = blogPosts.find(post => post.frontmatter.featured);

  return (
    <>
      <SEOHead
        title="UNA Formation Insights & Expert Guidance - All 50 States"
        description="Expert guidance on Unincorporated Nonprofit Association formation, legal compliance, and operational excellence for all 50 states. Read our comprehensive blog for UNA formation insights."
        keywords={[
          'UNA formation blog',
          'UNA formation insights',
          'UNA formation guide all states',
          'UNA formation legal compliance',
          'UNA formation best practices',
          'UNA formation case studies'
        ]}
        ogType="website"
        schema={{
          "@context": "https://schema.org",
          "@type": "Blog",
          "name": "UNA Formation Insights",
          "description": "Expert guidance on Unincorporated Nonprofit Association formation, legal compliance, and operational excellence in California.",
          "publisher": {
            "@type": "Organization",
            "name": "UNA Formation Platform"
          },
          "blogPost": blogPosts.map(post => ({
            "@type": "BlogPosting",
            "headline": post.frontmatter.title,
            "description": post.frontmatter.description,
            "author": {
              "@type": "Person",
              "name": post.frontmatter.author
            },
            "datePublished": post.frontmatter.date,
            "dateModified": post.frontmatter.date
          }))
        }}
      />
    <div className="min-h-screen bg-cream-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#1C1F3B] to-[#2F7E7E] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 font-montserrat text-white">
              <strong>UNA Formation</strong> Insights
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto font-lora text-white/90">
              Expert <strong>formation guidance</strong> for <strong>Unincorporated Nonprofit Associations</strong> in all 50 states. 
              Our <strong>research-based approach</strong> and <strong>business formation experience</strong> 
              ensure your organization is structured correctly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/explore" 
                className="bg-white text-navy-600 hover:bg-navy-100 font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
              >
                Start Your Formation
              </Link>
              <Link 
                to="/explore" 
                className="border-2 border-white text-white hover:bg-white hover:text-navy-600 font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
              >
                Explore Your Path
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white border-b border-navy-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#2F7E7E]" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-[#2F7E7E]/30 rounded-lg focus:ring-2 focus:ring-[#C49A6C] focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                    onClick={() => setSelectedCategory(category || 'all')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-[#C49A6C] text-white'
                      : 'bg-[#2F7E7E]/20 text-[#1C1F3B] hover:bg-[#2F7E7E]/30'
                  }`}
                >
                    {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

        {/* Featured Post Section */}
      {featuredPost && (
          <div className="bg-gradient-to-br from-gold-50 to-cream-100 border-b border-navy-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-[#1C1F3B] mb-4 font-montserrat">
                  Featured Article
                </h2>
                <p className="text-lg text-[#2A2A28] font-lora">
                  Essential reading for anyone considering UNA formation in California
                </p>
              </div>
              
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-2/3 p-8">
                <div className="flex items-center space-x-2 text-sm text-navy-500 mb-4">
                  <span className="bg-gold-100 text-gold-800 px-2 py-1 rounded-full text-xs font-medium">
                    Featured
                  </span>
                  <span>•</span>
                      <span>{featuredPost.frontmatter.category}</span>
                  <span>•</span>
                      <span>{featuredPost.frontmatter.readTime}</span>
                </div>
                
                <h2 className="text-3xl font-bold text-[#1C1F3B] mb-4 font-montserrat">
                      {featuredPost.frontmatter.title}
                </h2>
                
                <p className="text-lg text-[#2A2A28] mb-6 font-lora">
                      {featuredPost.frontmatter.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-navy-500">
                    <span className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                          {featuredPost.frontmatter.author}
                    </span>
                    <span className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                          {new Date(featuredPost.frontmatter.date).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <Link
                    to={`/blog/${featuredPost.slug}`}
                    className="bg-gold-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-gold-700 transition-colors flex items-center"
                  >
                    Read Full Article
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
              
              <div className="md:w-1/3 bg-gradient-to-br from-gold-50 to-cream-100 p-8 flex items-center justify-center">
                <div className="text-center">
                  <FileText className="h-16 w-16 text-gold-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-navy-900 mb-2">
                    Featured Article
                  </h3>
                  <p className="text-navy-600 text-sm">
                    Essential reading for anyone considering UNA formation in California
                  </p>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Blog Posts Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map(post => (
              <article key={post.slug} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="p-6">
                <div className="flex items-center space-x-2 text-sm text-navy-500 mb-4">
                  <span className="bg-navy-100 text-navy-800 px-2 py-1 rounded-full text-xs font-medium">
                      {post.frontmatter.category}
                  </span>
                  <span>•</span>
                    <span>{post.frontmatter.readTime}</span>
                </div>
                
                <h3 className="text-xl font-bold text-[#1C1F3B] mb-3 line-clamp-2 font-montserrat">
                    {post.frontmatter.title}
                </h3>
                
                <p className="text-[#2A2A28] mb-4 line-clamp-3 font-lora">
                    {post.frontmatter.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-navy-500">
                    <span className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                        {post.frontmatter.author}
                    </span>
                    <span className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                        {new Date(post.frontmatter.date).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <Link
                    to={`/blog/${post.slug}`}
                    className="text-gold-600 hover:text-gold-800 font-medium text-sm flex items-center"
                  >
                    Read More
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Related Resources Section - SEO Internal Linking */}
      <div className="bg-white border-t border-navy-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1C1F3B] mb-4 font-montserrat">
              Continue Your UNA Formation Journey
            </h2>
            <p className="text-lg text-[#2A2A28] max-w-2xl mx-auto font-lora">
              Explore our comprehensive resources and services to ensure your UNA formation is done right.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-gold-50 to-cream-100 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-navy-900 mb-4">
                Formation Services
              </h3>
              <div className="space-y-3">
                <Link 
                  to="/explore" 
                  className="block p-3 bg-white rounded-lg border border-navy-200 hover:border-gold-300 hover:shadow-sm transition-all duration-200"
                >
                  <div className="font-medium text-gold-600 hover:text-gold-800">
                    Explore Your Path
                  </div>
                  <div className="text-sm text-navy-600">
                    Find your ideal formation approach
                  </div>
                </Link>
                <Link 
                  to="/intake" 
                  className="block p-3 bg-white rounded-lg border border-navy-200 hover:border-gold-300 hover:shadow-sm transition-all duration-200"
                >
                  <div className="font-medium text-gold-600 hover:text-gold-800">
                    Start Formation
                  </div>
                  <div className="text-sm text-navy-600">
                    Begin your UNA formation process
                  </div>
                </Link>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-[#1C1F3B] mb-4 font-montserrat">
                Expert Guidance
              </h3>
              <div className="space-y-3">
                <Link 
                  to="/faq" 
                  className="block p-3 bg-white rounded-lg border border-navy-200 hover:border-emerald-300 hover:shadow-sm transition-all duration-200"
                >
                  <div className="font-medium text-emerald-600 hover:text-emerald-800">
                      FAQ & Support
                  </div>
                  <div className="text-sm text-[#2A2A28] font-lora">
                      Get answers to common questions
                  </div>
                </Link>
                <Link 
                    to="/services" 
                  className="block p-3 bg-white rounded-lg border border-[#2F7E7E]/30 hover:border-emerald-300 hover:shadow-sm transition-all duration-200"
                >
                  <div className="font-medium text-emerald-600 hover:text-emerald-800">
                      Schedule Consultation
                  </div>
                  <div className="text-sm text-[#2A2A28] font-lora">
                      Get personalized guidance
                  </div>
                </Link>
                <Link 
                    to="/services" 
                  className="block p-3 bg-white rounded-lg border border-[#2F7E7E]/30 hover:border-emerald-300 hover:shadow-sm transition-all duration-200"
                >
                  <div className="font-medium text-emerald-600 hover:text-emerald-800">
                      UNA Services & Toolkit
                  </div>
                  <div className="text-sm text-[#2A2A28] font-lora">
                      Professional guidance and essential tools
                  </div>
                </Link>
              </div>
            </div>
            
              <div className="bg-gradient-to-br from-navy-50 to-navy-100 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-[#1C1F3B] mb-4 font-montserrat">
                  Legal & Compliance
              </h3>
              <div className="space-y-3">
                <Link 
                    to="/services" 
                    className="block p-3 bg-white rounded-lg border border-navy-200 hover:border-navy-300 hover:shadow-sm transition-all duration-200"
                >
                    <div className="font-medium text-navy-600 hover:text-navy-800">
                      Pricing & Packages
                  </div>
                  <div className="text-sm text-[#2A2A28] font-lora">
                      See our formation packages
                  </div>
                </Link>
                <Link 
                    to="/about" 
                    className="block p-3 bg-white rounded-lg border border-[#2F7E7E]/30 hover:border-[#2F7E7E]/50 hover:shadow-sm transition-all duration-200"
                >
                    <div className="font-medium text-[#2F7E7E] hover:text-[#1C1F3B]">
                      About Our Platform
                  </div>
                  <div className="text-sm text-[#2A2A28] font-lora">
                      Learn about our expertise
                  </div>
                </Link>
                <Link 
                    to="/contact" 
                    className="block p-3 bg-white rounded-lg border border-[#2F7E7E]/30 hover:border-[#2F7E7E]/50 hover:shadow-sm transition-all duration-200"
                >
                    <div className="font-medium text-[#2F7E7E] hover:text-[#1C1F3B]">
                      Contact Us
                  </div>
                  <div className="text-sm text-[#2A2A28] font-lora">
                      Get in touch for support
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
