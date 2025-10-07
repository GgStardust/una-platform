import { supabase } from '../supabase';

export interface Blog {
  id?: string;
  slug: string;
  title: string;
  content: string;
  excerpt?: string;
  tags: string[];
  author?: string;
  featured_image?: string;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string[];
  published: boolean;
  created_at?: string;
  updated_at?: string;
}

export async function getAllBlogs(): Promise<{ data: Blog[] | null; error?: string }> {
  try {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching blogs:', error);
      return { data: null, error: error.message };
    }

    return { data };
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return { data: null, error: 'Failed to fetch blogs' };
  }
}

export async function getBlogBySlug(slug: string): Promise<{ data: Blog | null; error?: string }> {
  try {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      console.error('Error fetching blog:', error);
      return { data: null, error: error.message };
    }

    return { data };
  } catch (error) {
    console.error('Error fetching blog:', error);
    return { data: null, error: 'Failed to fetch blog' };
  }
}

export async function createBlog(blog: Omit<Blog, 'id' | 'created_at' | 'updated_at'>): Promise<{ success: boolean; data?: Blog; error?: string }> {
  try {
    const { data, error } = await supabase
      .from('blogs')
      .insert([blog])
      .select()
      .single();

    if (error) {
      console.error('Error creating blog:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error creating blog:', error);
    return { success: false, error: 'Failed to create blog' };
  }
}

export async function updateBlog(id: string, blog: Partial<Blog>): Promise<{ success: boolean; data?: Blog; error?: string }> {
  try {
    const { data, error } = await supabase
      .from('blogs')
      .update({ ...blog, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating blog:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error updating blog:', error);
    return { success: false, error: 'Failed to update blog' };
  }
}

export async function deleteBlog(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase
      .from('blogs')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting blog:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error('Error deleting blog:', error);
    return { success: false, error: 'Failed to delete blog' };
  }
}
