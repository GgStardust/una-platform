#!/usr/bin/env tsx
/**
 * Blog Import Tool for UNA Platform
 *
 * Usage:
 *   npm run import-blog <file-path>
 *   npm run import-blog src/content/blog/my-post.mdx
 *
 * Or bulk import all:
 *   npm run import-blog src/content/blog/*.mdx
 *
 * Features:
 * - Parses MDX/Markdown frontmatter
 * - Auto-generates slug from filename
 * - Uploads directly to Supabase
 * - Updates existing posts by slug
 * - Shows preview before upload
 */

import * as fs from 'fs';
import * as path from 'path';
import { createClient } from '@supabase/supabase-js';
import * as readline from 'readline';
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

// Confirm with user
async function confirm(message: string): Promise<boolean> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise(resolve => {
    rl.question(`${message} (y/n): `, answer => {
      rl.close();
      resolve(answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes');
    });
  });
}

// Main import function
async function importBlog(filePath: string, preview: boolean = true) {
  try {
    // Read file
    if (!fs.existsSync(filePath)) {
      console.error(`❌ File not found: ${filePath}`);
      return;
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
    console.log('\n📝 Blog Post Preview:');
    console.log('━'.repeat(60));
    console.log(`Title: ${blog.title}`);
    console.log(`Slug: ${blog.slug}`);
    console.log(`Author: ${blog.author}`);
    console.log(`Tags: ${blog.tags.join(', ')}`);
    console.log(`Published: ${blog.published}`);
    console.log(`Content length: ${blog.content.length} characters`);
    console.log(`Excerpt: ${blog.excerpt.substring(0, 100)}...`);
    console.log('━'.repeat(60));

    if (preview) {
      const proceed = await confirm('\n✅ Upload this blog to Supabase?');
      if (!proceed) {
        console.log('❌ Upload cancelled');
        return;
      }
    }

    // Initialize Supabase
    const supabaseUrl = process.env.VITE_SUPABASE_URL;
    const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error('❌ Supabase credentials not found in environment');
      console.error('Make sure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set');
      return;
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
      console.log(`\n🔄 Updating existing blog (ID: ${existing.id})...`);
      result = await supabase
        .from('blogs')
        .update({
          ...blog,
          updated_at: new Date().toISOString()
        })
        .eq('id', existing.id);
    } else {
      // Create new
      console.log('\n📤 Creating new blog...');
      result = await supabase
        .from('blogs')
        .insert([blog]);
    }

    if (result.error) {
      console.error('❌ Upload failed:', result.error.message);
    } else {
      console.log('✅ Successfully uploaded to Supabase!');
      console.log(`🔗 View at: /blog/${blog.slug}`);
    }

  } catch (error) {
    console.error('❌ Error:', error);
  }
}

// CLI Handler
async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log(`
📚 UNA Platform Blog Import Tool

Usage:
  npm run import-blog <file-path>           Import single blog
  npm run import-blog <file-path> --no-preview   Skip preview
  npm run import-blog src/content/blog/*.mdx      Import multiple files

Examples:
  npm run import-blog src/content/blog/una-formation-guide.mdx
  npm run import-blog src/content/blog/california-una.mdx --no-preview
    `);
    return;
  }

  const preview = !args.includes('--no-preview');
  const files = args.filter(arg => !arg.startsWith('--'));

  for (const file of files) {
    await importBlog(file, preview);
  }
}

main();
