#!/usr/bin/env node

/**
 * Global Color Update Script
 * This script updates colors across the entire codebase
 * Usage: node scripts/update-colors.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Color mappings - update these to change the entire site
const COLOR_MAPPINGS = {
  // Old colors to replace
  '#1E2A38': 'var(--color-primary)',
  '#3DB5B0': 'var(--color-accent)',
  '#F4EFE6': 'var(--color-surface)',
  '#2C2C2C': 'var(--color-text-primary)',
  '#E57373': 'var(--color-error)',
  
  // Additional old colors that might exist
  '#1C1F3B': 'var(--color-primary)',
  '#C49A6C': 'var(--color-accent)',
  '#B8955A': 'var(--color-accent-dark)',
  '#2F7E7E': 'var(--color-primary-light)',
  '#7A4CA0': 'var(--color-primary)',
  
  // Gradient replacements
  'from-[#1E2A38]': 'from-[var(--color-primary)]',
  'to-[#3DB5B0]': 'to-[var(--color-accent)]',
  'from-[#3DB5B0]': 'from-[var(--color-accent)]',
  'to-[#1E2A38]': 'to-[var(--color-primary)]',
  'from-[#1C1F3B]': 'from-[var(--color-primary)]',
  'to-[#2F7E7E]': 'to-[var(--color-primary-light)]',
  'from-[#C49A6C]': 'from-[var(--color-accent)]',
  'to-[#B8955A]': 'to-[var(--color-accent-dark)]',
  
  // Text color replacements
  'text-[#1E2A38]': 'text-primary',
  'text-[#3DB5B0]': 'text-accent',
  'text-[#2C2C2C]': 'text-primary',
  'text-[#E57373]': 'text-error',
  
  // Background color replacements
  'bg-[#1E2A38]': 'bg-primary',
  'bg-[#3DB5B0]': 'bg-accent',
  'bg-[#F4EFE6]': 'bg-surface',
  'bg-[#2C2C2C]': 'bg-primary',
  
  // Border color replacements
  'border-[#1E2A38]': 'border-primary',
  'border-[#3DB5B0]': 'border-accent',
  'border-[#C49A6C]': 'border-accent',
  
  // Focus ring replacements
  'focus:ring-[#3DB5B0]': 'focus:ring-accent',
  'focus:ring-[#C49A6C]': 'focus:ring-accent',
};

// Files to update
const TARGET_DIRS = [
  'src/pages',
  'src/components',
  'src/lib'
];

const TARGET_EXTENSIONS = ['.tsx', '.ts', '.jsx', '.js'];

function getAllFiles(dir, extensions) {
  let results = [];
  const list = fs.readdirSync(dir);
  
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllFiles(filePath, extensions));
    } else if (extensions.some(ext => file.endsWith(ext))) {
      results.push(filePath);
    }
  });
  
  return results;
}

function updateFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let updated = false;
  
  // Apply color mappings
  Object.entries(COLOR_MAPPINGS).forEach(([oldColor, newColor]) => {
    if (content.includes(oldColor)) {
      content = content.replace(new RegExp(oldColor.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newColor);
      updated = true;
    }
  });
  
  if (updated) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated: ${filePath}`);
    return true;
  }
  
  return false;
}

function main() {
  console.log('🎨 Starting global color update...\n');
  
  let totalUpdated = 0;
  
  TARGET_DIRS.forEach(dir => {
    if (fs.existsSync(dir)) {
      const files = getAllFiles(dir, TARGET_EXTENSIONS);
      console.log(`📁 Processing ${dir} (${files.length} files)`);
      
      files.forEach(file => {
        if (updateFile(file)) {
          totalUpdated++;
        }
      });
    }
  });
  
  console.log(`\n✅ Color update complete! Updated ${totalUpdated} files.`);
  console.log('\n💡 To change colors globally, update the COLOR_MAPPINGS in this script and run it again.');
}

if (require.main === module) {
  main();
}

module.exports = { COLOR_MAPPINGS, updateFile };
