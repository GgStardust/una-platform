#!/bin/bash

echo "🔧 Setting up Stripe Webhooks for Local Development"
echo "=================================================="

# Check if Stripe CLI is installed
if ! command -v stripe &> /dev/null; then
    echo "❌ Stripe CLI is not installed."
    echo "📦 Install it with: brew install stripe/stripe-cli/stripe"
    echo "   Or visit: https://stripe.com/docs/stripe-cli"
    exit 1
fi

echo "✅ Stripe CLI is installed"

# Check if user is logged in
if ! stripe config --list &> /dev/null; then
    echo "🔐 Please log in to Stripe first:"
    echo "   stripe login"
    exit 1
fi

echo "✅ Stripe CLI is authenticated"

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "⚠️  .env file not found. Creating from env.example..."
    cp env.example .env
    echo "✅ Created .env file from env.example"
fi

echo ""
echo "🚀 Next steps:"
echo "1. Start your app: npm run dev"
echo "2. In another terminal, run: stripe listen --forward-to localhost:5173/api/webhook"
echo "3. Copy the webhook signing secret (starts with whsec_)"
echo "4. Update STRIPE_WEBHOOK_SECRET in your .env file"
echo "5. Test with: npm run stripe:test"
echo ""
echo "📖 For detailed instructions, see: STRIPE_WEBHOOK_SETUP.md"
