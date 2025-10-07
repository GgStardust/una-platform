import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL!;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkBlogs() {
  console.log('🔍 Checking existing blogs in Supabase...\n');
  
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('❌ Error:', error.message);
    return;
  }

  if (!data || data.length === 0) {
    console.log('📭 No blogs found in database');
    console.log('\nYou can run the migration script to populate blogs:');
    console.log('npx tsx scripts/migrate-blogs-to-supabase.ts');
  } else {
    console.log(`📊 Found ${data.length} blog posts:\n`);
    data.forEach((blog, index) => {
      console.log(`${index + 1}. ${blog.title}`);
      console.log(`   Slug: ${blog.slug}`);
      console.log(`   Tags: ${blog.tags?.join(', ') || 'none'}`);
      console.log(`   Created: ${new Date(blog.created_at).toLocaleDateString()}`);
      console.log('');
    });
  }
}

checkBlogs();
