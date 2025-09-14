import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { join } from 'path';

// Load environment variables
const supabaseUrl = process.env.VITE_SUPABASE_URL || 'http://localhost:9999';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || 'dummy-anon-key';

// Initialize Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

interface BlogData {
  slug: string;
  title: string;
  content: string;
  tags: string[];
}

interface StateSnippet {
  state_code: string;
  title: string;
  summary: string;
  requirements: any;
}

async function seedBlogs() {
  console.log('📝 Seeding blogs...');
  
  try {
    // Read the markdown content
    const markdownPath = join(process.cwd(), 'seed', 'top10-states.md');
    const content = readFileSync(markdownPath, 'utf-8');
    
    const blogData: BlogData = {
      slug: 'top-10-states',
      title: 'UNA Formation Requirements: Top 10 States You Need to Know',
      content: content,
      tags: ['una-formation', 'state-requirements', 'top-10', 'guidance']
    };
    
    // Check if blog already exists
    const { data: existingBlog } = await supabase
      .from('blogs')
      .select('id')
      .eq('slug', blogData.slug)
      .single();
    
    if (existingBlog) {
      // Update existing blog
      const { error } = await supabase
        .from('blogs')
        .update({
          title: blogData.title,
          content: blogData.content,
          tags: blogData.tags,
          updated_at: new Date().toISOString()
        })
        .eq('slug', blogData.slug);
      
      if (error) throw error;
      console.log('✅ Updated existing blog:', blogData.slug);
    } else {
      // Insert new blog
      const { error } = await supabase
        .from('blogs')
        .insert(blogData);
      
      if (error) throw error;
      console.log('✅ Created new blog:', blogData.slug);
    }
    
    return blogData;
  } catch (error) {
    console.error('❌ Error seeding blogs:', error);
    throw error;
  }
}

async function seedStateSnippets(blogId: string) {
  console.log('🗺️ Seeding state snippets...');
  
  try {
    // Read the state snippets JSON
    const snippetsPath = join(process.cwd(), 'seed', 'state-snippets.json');
    const snippetsData = JSON.parse(readFileSync(snippetsPath, 'utf-8')) as StateSnippet[];
    
    for (const snippet of snippetsData) {
      // Check if snippet already exists
      const { data: existingSnippet } = await supabase
        .from('state_snippets')
        .select('id')
        .eq('state_code', snippet.state_code)
        .single();
      
      if (existingSnippet) {
        // Update existing snippet
        const { error } = await supabase
          .from('state_snippets')
          .update({
            title: snippet.title,
            summary: snippet.summary,
            requirements: snippet.requirements,
            blog_id: blogId
          })
          .eq('state_code', snippet.state_code);
        
        if (error) throw error;
        console.log(`✅ Updated state snippet: ${snippet.state_code}`);
      } else {
        // Insert new snippet
        const { error } = await supabase
          .from('state_snippets')
          .insert({
            state_code: snippet.state_code,
            title: snippet.title,
            summary: snippet.summary,
            requirements: snippet.requirements,
            blog_id: blogId
          });
        
        if (error) throw error;
        console.log(`✅ Created state snippet: ${snippet.state_code}`);
      }
    }
    
    console.log(`✅ Seeded ${snippetsData.length} state snippets`);
  } catch (error) {
    console.error('❌ Error seeding state snippets:', error);
    throw error;
  }
}

async function main() {
  console.log('🌱 Starting Sprint 5 seeding process...');
  console.log(`📡 Connecting to Supabase: ${supabaseUrl}`);
  
  try {
    // Seed blogs first
    const blogData = await seedBlogs();
    
    // Get the blog ID for linking snippets
    const { data: blog } = await supabase
      .from('blogs')
      .select('id')
      .eq('slug', blogData.slug)
      .single();
    
    if (!blog) {
      throw new Error('Failed to retrieve blog ID');
    }
    
    // Seed state snippets
    await seedStateSnippets(blog.id);
    
    console.log('🎉 Sprint 5 seeding completed successfully!');
    console.log('📊 Summary:');
    console.log('   - 1 blog seeded: top-10-states');
    console.log('   - 10 state snippets seeded: CA, TX, FL, NY, IL, PA, OH, GA, NC, MI');
    console.log('   - All data is idempotent (safe to re-run)');
    
  } catch (error) {
    console.error('💥 Seeding failed:', error);
    process.exit(1);
  }
}

// Run the seeding process
main();
