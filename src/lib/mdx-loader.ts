import matter from 'gray-matter';

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

// Import all MDX files from the blog directory
const blogModules = import.meta.glob('../content/blog/*.mdx', { eager: true });

export function getAllBlogPosts(): BlogPost[] {
  const posts: BlogPost[] = [];

  for (const path in blogModules) {
    const module = blogModules[path] as any;
    const slug = path.replace('../content/blog/', '').replace('.mdx', '');
    
    if (module.default) {
      const { data, content } = matter(module.default);
      
      posts.push({
        slug,
        frontmatter: {
          title: data.title || slug,
          description: data.description || '',
          date: data.date || new Date().toISOString(),
          tags: data.tags || [],
          canonical: data.canonical,
          image: data.image,
          shareTitle: data.shareTitle,
          shareSummary: data.shareSummary,
          pinterestTitle: data.pinterestTitle,
          youtubeShortScript: data.youtubeShortScript,
          author: data.author || 'UNA Platform',
          category: data.category || 'UNA Formation',
          featured: data.featured || false,
          readTime: data.readTime || '5 min read'
        },
        content
      });
    }
  }

  // Sort by date (newest first)
  return posts.sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime());
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
