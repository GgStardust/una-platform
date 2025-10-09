#!/usr/bin/env tsx
/**
 * Auto Blog Import Tool (No Prompts) for UNA Platform
 *
 * Usage:
 *   npm run import-blog-auto <file-path>
 *   npm run import-blog-auto src/content/blog/my-post.mdx
 *
 * Automatically uploads without confirmation prompts
 */

import * as fs from 'fs';
import * as path from 'path';
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Parse frontmatter from MDX/Markdown
function parseFrontmatter(content: string) {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    return { frontmatter: {}, content: content };
  }

  const [, frontmatterStr, bodyContent] = match;
  const frontmatter: any = {};

  // Parse YAML-like frontmatter
  frontmatterStr.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim();
      let value = line.substring(colonIndex + 1).trim();

      // Remove quotes
      value = value.replace(/^['"]|['"]$/g, '');

      // Parse arrays (tags)
      if (value.startsWith('[') && value.endsWith(']')) {
        value = value
          .substring(1, value.length - 1)
          .split(',')
          .map(v => v.trim().replace(/^['"]|['"]$/g, ''));
      }

      frontmatter[key] = value;
    }
  });

  return { frontmatter, content: bodyContent.trim() };
}

// Generate slug from filename
function generateSlug(filename: string): string {
  return path.basename(filename, path.extname(filename))
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// Main import function (auto mode - no prompts)
async function importBlog(filePath: string) {
  try {
    // Read file
    if (!fs.existsSync(filePath)) {
      console.error(`❌ File not found: ${filePath}`);
      return false;
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { frontmatter, content } = parseFrontmatter(fileContent);

    // Build blog object
    const slug = frontmatter.slug || generateSlug(filePath);
    const title = frontmatter.title || slug.replace(/-/g, ' ');
    const tags = Array.isArray(frontmatter.tags) ? frontmatter.tags :
                 typeof frontmatter.tags === 'string' ? [frontmatter.tags] : [];

    const blog = {
      slug,
      title,
      content,
      excerpt: frontmatter.excerpt || content.substring(0, 160),
      tags,
      author: frontmatter.author || 'UNA Platform Team',
      featured_image: frontmatter.featured_image || '',
      meta_title: frontmatter.meta_title || title,
      meta_description: frontmatter.meta_description || frontmatter.excerpt || content.substring(0, 160),
      meta_keywords: frontmatter.meta_keywords || tags,
      published: frontmatter.published !== false
    };

    // Preview
    console.log(`\n📝 ${path.basename(filePath)}`);
    console.log(`   Title: ${blog.title}`);
    console.log(`   Slug: ${blog.slug}`);
    console.log(`   Tags: ${blog.tags.join(', ')}`);

    // Initialize Supabase
    const supabaseUrl = process.env.VITE_SUPABASE_URL;
    const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error('   ❌ Supabase credentials not found');
      return false;
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Check if blog exists
    const { data: existing } = await supabase
      .from('blogs')
      .select('id')
      .eq('slug', blog.slug)
      .single();

    let result;
    if (existing) {
      // Update existing
      result = await supabase
        .from('blogs')
        .update({
          ...blog,
          updated_at: new Date().toISOString()
        })
        .eq('id', existing.id);

      if (result.error) {
        console.error(`   ❌ Update failed: ${result.error.message}`);
        return false;
      }
      console.log(`   ✅ Updated (ID: ${existing.id})`);
    } else {
      // Create new
      result = await supabase
        .from('blogs')
        .insert([blog]);

      if (result.error) {
        console.error(`   ❌ Create failed: ${result.error.message}`);
        return false;
      }
      console.log(`   ✅ Created new blog`);
    }

    return true;

  } catch (error: any) {
    console.error(`   ❌ Error: ${error.message}`);
    return false;
  }
}

// CLI Handler
async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log(`
📚 UNA Platform Blog Auto-Import Tool

Usage:
  npm run import-blog-auto <file-path>              Import single blog
  npm run import-blog-auto src/content/blog/*.mdx   Import multiple files

Automatically uploads without confirmation prompts.
    `);
    return;
  }

  console.log('\n🚀 Starting auto-import...\n');

  let successCount = 0;
  let failCount = 0;

  for (const file of args) {
    const success = await importBlog(file);
    if (success) {
      successCount++;
    } else {
      failCount++;
    }
  }

  console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`✅ Success: ${successCount}`);
  console.log(`❌ Failed: ${failCount}`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);
}

main();
