# UNA Platform - Lite Version

A revenue-first UNA Formation platform focused on Strategy Sessions, Document Preparation, and comprehensive state-specific guidance.

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment:**
   ```bash
   npm run setup:env
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Set up Stripe webhooks (for payment testing):**
   ```bash
   npm run setup:webhooks
   ```

## Stripe Webhook Setup

For local development with payment testing, you'll need to set up Stripe webhooks:

### Prerequisites
- Stripe account with test mode enabled
- Stripe CLI installed: `brew install stripe/stripe-cli/stripe`

### Setup Steps

1. **Authenticate with Stripe:**
   ```bash
   stripe login
   ```

2. **Start webhook forwarding:**
   ```bash
   stripe listen --forward-to localhost:5173/api/webhook
   ```

3. **Update environment variables:**
   - Copy the webhook signing secret (starts with `whsec_`)
   - Update `STRIPE_WEBHOOK_SECRET` in your `.env` file

4. **Test webhook integration:**
   ```bash
   npm run stripe:test
   ```

For detailed instructions, see [STRIPE_WEBHOOK_SETUP.md](./STRIPE_WEBHOOK_SETUP.md).

## Available Scripts

- `npm run dev` - Start development server
- `npm run dev:clean` - Clean start (kills stale processes)
- `npm run setup:env` - Create .env file with dummy values
- `npm run setup:webhooks` - Check Stripe webhook setup
- `npm run seed` - Seed database with state data
- `npm run stripe:test` - Test Stripe webhook events
- `npm run build` - Build for production

## Features

- **State-Specific Guidance**: Top 10 states with detailed UNA formation requirements
- **Payment Integration**: Stripe-powered Strategy Sessions and Document Preparation
- **Intake Forms**: Multi-step forms with state-specific validation
- **Blog System**: Comprehensive UNA formation guidance
- **Admin Dashboard**: Content and user management

## Project Structure

```
src/
├── pages/           # Main application pages
├── components/      # Reusable UI components
├── lib/            # Utilities and helpers
├── api/            # Backend API routes
├── database/       # Database schemas and migrations
└── scripts/        # Development and setup scripts
```

## Environment Variables

See `env.example` for all required environment variables. Key variables:

- `VITE_STRIPE_PUBLISHABLE_KEY` - Stripe publishable key
- `STRIPE_SECRET_KEY` - Stripe secret key
- `STRIPE_WEBHOOK_SECRET` - Stripe webhook signing secret
- `VITE_SUPABASE_URL` - Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Supabase anonymous key

## Development

The app runs on `http://localhost:5173` with hot reload enabled.

### State Pages
- `/states/CA` - California UNA requirements
- `/states/TX` - Texas UNA requirements
- `/states/FL` - Florida UNA requirements
- ... (all Top 10 states)

### API Endpoints
- `/api/create-checkout-session` - Create Stripe checkout sessions
- `/api/webhook` - Handle Stripe webhook events

## Testing

- **Webhook Testing**: Use `npm run stripe:test` to trigger test events
- **Payment Flow**: Complete checkout process and verify webhook logs
- **State Integration**: Test state selection in Explore and Intake forms

## Production Deployment

1. Update environment variables with production values
2. Set up production Stripe webhook endpoints
3. Configure Supabase for production
4. Build and deploy: `npm run build`

## Support

For detailed setup instructions:
- Stripe Webhooks: [STRIPE_WEBHOOK_SETUP.md](./STRIPE_WEBHOOK_SETUP.md)
- Database Setup: [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)
- Booking Module: [BOOKING_MODULE.md](./BOOKING_MODULE.md)