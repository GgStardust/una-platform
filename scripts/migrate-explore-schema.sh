#!/bin/bash

# Sprint 7: Explore Path Redesign - Database Migration Script
# This script applies the new explore_responses table schema to Supabase

echo "🔄 Running Sprint 7 Explore Path Redesign database migration..."

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "❌ .env file not found. Please run setup-env.sh first."
    exit 1
fi

# Load environment variables
source .env

# Check if Supabase URL and key are set
if [ -z "$VITE_SUPABASE_URL" ] || [ -z "$VITE_SUPABASE_ANON_KEY" ]; then
    echo "❌ Supabase environment variables not set. Please check your .env file."
    exit 1
fi

echo "📊 Applying explore_responses table schema..."

# Run the SQL migration
if command -v psql &> /dev/null; then
    # If psql is available, try to run the migration directly
    echo "🔧 Running migration with psql..."
    PGPASSWORD="$SUPABASE_DB_PASSWORD" psql -h "$SUPABASE_DB_HOST" -U "$SUPABASE_DB_USER" -d "$SUPABASE_DB_NAME" -f "src/database/sprint7-explore-schema.sql"
else
    echo "⚠️  psql not found. Please run the following SQL in your Supabase dashboard:"
    echo ""
    echo "📋 Copy and paste this SQL into your Supabase SQL editor:"
    echo "================================================"
    cat src/database/sprint7-explore-schema.sql
    echo "================================================"
    echo ""
    echo "Then press Enter to continue..."
    read -r
fi

echo "✅ Sprint 7 Explore Path Redesign migration complete!"
echo ""
echo "🎯 Next steps:"
echo "1. Verify the explore_responses table was created in Supabase"
echo "2. Test the new Explore flow at /explore"
echo "3. Check that responses are being saved to the database"
