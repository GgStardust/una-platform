

export interface BlogPostFrontmatter {
  title: string;
  description: string;
  date: string;
  tags: string[];
  canonical?: string;
  image?: string;
  shareTitle?: string;
  shareSummary?: string;
  pinterestTitle?: string;
  youtubeShortScript?: string;
  author?: string;
  category?: string;
  featured?: boolean;
  readTime?: string;
}

export interface BlogPost {
  slug: string;
  frontmatter: BlogPostFrontmatter;
  content: string;
}

// import matter from 'gray-matter'; // Will be used when implementing actual MDX file reading

// Get all blog posts from the content directory
export function getAllBlogPosts(): BlogPost[] {
  // In a real implementation, this would read from the filesystem
  // For now, return a sample post to test the system
  return [
    {
      slug: 'complete-una-formation-guide',
      frontmatter: {
        title: 'Complete UNA Formation Guide',
        description: 'A comprehensive guide to forming your Unincorporated Nonprofit Association',
        date: '2024-01-15',
        tags: ['formation', 'guide', 'una'],
        canonical: '/blog/complete-una-formation-guide',
        image: '/images/una-formation.jpg',
        shareTitle: 'Complete UNA Formation Guide',
        shareSummary: 'Everything you need to know about forming a UNA',
        pinterestTitle: 'UNA Formation Guide',
        youtubeShortScript: 'How to form a UNA step by step',
        author: 'Gigi Stardust',
        category: 'Formation',
        featured: true,
        readTime: '10 min read'
      },
      content: 'This is a sample blog post content. In production, this would be loaded from MDX files.'
    },
    {
      slug: 'financial-management-una',
      frontmatter: {
        title: 'Financial Management for UNAs',
        description: 'Essential financial practices and tools for Unincorporated Nonprofit Associations',
        date: '2024-01-20',
        tags: ['financial', 'management', 'una'],
        canonical: '/blog/financial-management-una',
        image: '/images/financial-management.jpg',
        shareTitle: 'Financial Management for UNAs',
        shareSummary: 'Essential financial practices for UNA operations',
        pinterestTitle: 'UNA Financial Management',
        youtubeShortScript: 'Financial management tips for UNAs',
        author: 'Gigi Stardust',
        category: 'Financial',
        featured: false,
        readTime: '8 min read'
      },
      content: 'Financial management content for UNAs...'
    },
    {
      slug: 'una-governance-best-practices',
      frontmatter: {
        title: 'UNA Governance Best Practices',
        description: 'Effective governance structures and practices for Unincorporated Nonprofit Associations',
        date: '2024-01-25',
        tags: ['governance', 'best-practices', 'una'],
        canonical: '/blog/una-governance-best-practices',
        image: '/images/governance.jpg',
        shareTitle: 'UNA Governance Best Practices',
        shareSummary: 'Effective governance for UNA operations',
        pinterestTitle: 'UNA Governance',
        youtubeShortScript: 'Governance best practices for UNAs',
        author: 'Gigi Stardust',
        category: 'Governance',
        featured: false,
        readTime: '12 min read'
      },
      content: 'Governance best practices content...'
    }
  ];
}

export function getBlogPost(slug: string): BlogPost | null {
  const posts = getAllBlogPosts();
  return posts.find(post => post.slug === slug) || null;
}

export function getBlogPostsByTag(tag: string): BlogPost[] {
  const posts = getAllBlogPosts();
  return posts.filter(post => post.frontmatter.tags.includes(tag));
}

export function getBlogPostsByCategory(category: string): BlogPost[] {
  const posts = getAllBlogPosts();
  return posts.filter(post => post.frontmatter.category === category);
}

export function getFeaturedBlogPosts(): BlogPost[] {
  const posts = getAllBlogPosts();
  return posts.filter(post => post.frontmatter.featured);
}
