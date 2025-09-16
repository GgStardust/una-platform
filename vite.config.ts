import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  assetsInclude: ['**/*.mdx'],
  optimizeDeps: {
    exclude: ['@mdx-js/react', '@mdx-js/loader']
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React libraries
          'react-vendor': ['react', 'react-dom'],
          // UI and icons
          'ui-vendor': ['lucide-react'],
          // Form handling
          'forms-vendor': ['react-hook-form', '@hookform/resolvers', 'zod'],
          // Routing
          'router-vendor': ['react-router-dom'],
          // PDF and document generation
          'doc-vendor': ['jspdf', 'docx'],
          // Stripe payments
          'stripe-vendor': ['@stripe/stripe-js', 'stripe'],
          // MDX content
          'mdx-vendor': ['@mdx-js/react', '@mdx-js/loader', 'gray-matter'],
          // Other utilities
          'utils-vendor': ['@supabase/supabase-js']
        }
      }
    },
    // Increase chunk size warning limit to 600KB (reasonable for modern apps)
    chunkSizeWarningLimit: 600
  }
})
