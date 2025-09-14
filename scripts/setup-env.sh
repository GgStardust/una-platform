#!/bin/bash

# Create .env file with dummy values for local development
cat > .env << 'EOF'
# Supabase (dummy values for local dev)
VITE_SUPABASE_URL=http://localhost:9999
VITE_SUPABASE_ANON_KEY=dummy-anon-key

# Stripe (dummy values for local dev)
VITE_STRIPE_PUBLISHABLE_KEY=dummy-publishable-key
STRIPE_SECRET_KEY=dummy-secret-key
STRIPE_WEBHOOK_SECRET=dummy-webhook-secret

# Stripe Product Price IDs (dummy placeholders)
STRIPE_STRATEGY_SESSION_PRICE_ID=price_dummy_250
STRIPE_DOCUMENT_PREP_PRICE_ID=price_dummy_750
STRIPE_BUNDLE_PRICE_ID=price_dummy_1000

# Site config
VITE_SITE_URL=http://localhost:5173
SITE_URL=http://localhost:5173
EOF

echo "✅ Created .env file with dummy values for local development"
echo "⚠️  Remember: This app is running with dummy credentials!"
