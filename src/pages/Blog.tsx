import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, User, ArrowRight, FileText } from 'lucide-react';
import { getAllBlogPosts, BlogPost } from '@/lib/mdx-loader';
import SEOHead from '../components/SEOHead';
import { GlassCard, GradientHeader, PremiumButton, SectionContainer } from '@/components/ui';

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
  const categories = ['all', ...Array.from(new Set(blogPosts.map(post => post.frontmatter?.category).filter(Boolean)))];

  // Filter posts based on search and category
  useEffect(() => {
    const filtered = blogPosts.filter(post => {
      if (!post?.frontmatter) return false;

      const matchesSearch = post.frontmatter.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.frontmatter.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.frontmatter.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

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
    <div className="min-h-screen bg-gradient-to-br from-[#1E2A38] via-[#2F7E7E] to-[#1C1F3B]">
      {/* Hero Section */}
      <GradientHeader
        title={
          <>
            <strong>UNA Formation</strong> Insights
          </>
        }
        subtitle={
          <>
            Expert <strong>formation guidance</strong> for <strong>Unincorporated Nonprofit Associations</strong> in all 50 states.
            Our <strong>research-based approach</strong> and <strong>business formation experience</strong>
            ensure your organization is structured correctly.
          </>
        }
        primaryCTA={{
          text: "Start Your Formation",
          to: "/explore"
        }}
        secondaryCTA={{
          text: "Explore Your Path",
          to: "/explore"
        }}
      />

      {/* Search and Filter Section */}
      <div className="backdrop-blur-md bg-white/10 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/70" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-white/30 rounded-lg focus:ring-2 focus:ring-[#C49A6C] focus:border-transparent text-base min-h-[44px] bg-white/10 backdrop-blur-sm text-white placeholder-white/60"
              />
            </div>

            {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category || 'all'}
                  onClick={() => setSelectedCategory(category || 'all')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
                    selectedCategory === category
                      ? 'bg-[#C49A6C] text-white'
                      : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm'
                  }`}
                >
                  {category || 'all'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

        {/* Featured Post Section */}
      {featuredPost && (
          <div className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-4 font-montserrat">
                  Featured Article
                </h2>
                <p className="text-lg text-white/90 font-lora">
                  Essential reading for anyone considering UNA formation
                </p>
              </div>

          <GlassCard variant="solid" className="overflow-hidden">
            <div className="md:flex">
              <div className="md:w-2/3 p-8">
                <div className="flex items-center space-x-2 text-base text-[#1C1F3B]/70 mb-4">
                  <span className="bg-[#C49A6C] text-white px-2 py-1 rounded-full text-base font-medium">
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

                <p className="text-lg text-[#1C1F3B]/80 mb-6 font-lora">
                      {featuredPost.frontmatter.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-base text-[#1C1F3B]/70">
                    <span className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                          {featuredPost.frontmatter.author}
                    </span>
                    <span className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                          {new Date(featuredPost.frontmatter.date).toLocaleDateString()}
                    </span>
                  </div>

                  <PremiumButton
                    to={`/blog/${featuredPost.slug}`}
                    variant="primary"
                  >
                    Read Full Article
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </PremiumButton>
                </div>
              </div>

              <div className="md:w-1/3 bg-gradient-to-br from-[#C49A6C]/20 to-[#2F7E7E]/20 p-8 flex items-center justify-center">
                <div className="text-center">
                  <FileText className="h-16 w-16 text-[#C49A6C] mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-[#1C1F3B] mb-2">
                    Featured Article
                  </h3>
                  <p className="text-[#1C1F3B]/80 text-base">
                    Essential reading for anyone considering UNA formation in California
                  </p>
                    </div>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      )}

      {/* Blog Posts Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map(post => (
              <GlassCard key={post.slug} variant="solid" className="overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center space-x-2 text-sm text-[#1C1F3B]/70 mb-4">
                  <span className="bg-[#2F7E7E]/20 text-[#1C1F3B] px-2 py-1 rounded-full text-xs font-medium">
                      {post.frontmatter.category}
                  </span>
                  <span>•</span>
                    <span className="text-xs">{post.frontmatter.readTime}</span>
                </div>

                <h3 className="text-xl font-bold text-[#1C1F3B] mb-3 line-clamp-2 font-montserrat">
                    {post.frontmatter.title}
                </h3>

                <p className="text-[#1C1F3B]/80 mb-6 line-clamp-3 font-lora flex-grow">
                    {post.frontmatter.description}
                </p>

                <div className="mt-auto space-y-3">
                  <div className="flex items-center space-x-4 text-sm text-[#1C1F3B]/70">
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
                    className="text-[#C49A6C] hover:text-[#2F7E7E] font-semibold text-sm flex items-center font-montserrat"
                  >
                    Read More
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

    </div>
    </>
  );
}
