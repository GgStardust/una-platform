

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

// For now, return empty array since MDX loading needs proper Vite configuration
// This will be implemented properly in the next iteration
export function getAllBlogPosts(): BlogPost[] {
  return [];
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
