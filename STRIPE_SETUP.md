# Stripe Payment Integration Setup

This guide will help you set up Stripe payments for the UNA Formation Platform.

## Prerequisites

1. Stripe account (test mode for development)
2. Node.js and npm installed
3. Environment variables configured

## Setup Steps

### 1. Install Dependencies

```bash
npm install stripe @stripe/stripe-js
```

### 2. Configure Environment Variables

Copy `env.example` to `.env` and fill in your Stripe keys:

```bash
cp env.example .env
```

Update the following variables in your `.env` file:

```env
# Stripe Payment Integration
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# Stripe Product Price IDs (set after running setup script)
STRIPE_STRATEGY_SESSION_PRICE_ID=price_your_strategy_session_price_id_here
STRIPE_DOCUMENT_PREP_PRICE_ID=price_your_document_prep_price_id_here
STRIPE_BUNDLE_PRICE_ID=price_your_bundle_price_id_here
```

### 3. Create Stripe Products

Run the setup script to create products and get price IDs:

```bash
node scripts/setup-stripe-products.js
```

This will:
- Create 3 products in your Stripe account
- Generate price IDs for each product
- Output the price IDs to update your `.env` file

### 4. Update Environment Variables

Copy the price IDs from the script output and update your `.env` file:

```env
STRIPE_STRATEGY_SESSION_PRICE_ID=price_1234567890abcdef
STRIPE_DOCUMENT_PREP_PRICE_ID=price_0987654321fedcba
STRIPE_BUNDLE_PRICE_ID=price_abcdef1234567890
```

### 5. Set Up Webhook Endpoint

1. Go to your Stripe Dashboard
2. Navigate to Webhooks
3. Add endpoint: `https://your-domain.com/api/webhook`
4. Select events: `checkout.session.completed`
5. Copy the webhook secret to your `.env` file

### 6. Test the Integration

1. Start your development server: `npm run dev`
2. Navigate to `/consultation`
3. Test the payment flow with Stripe test cards:
   - Success: `4242 4242 4242 4242`
   - Decline: `4000 0000 0000 0002`

## Products Created

### 1. Strategy Session - $250
- 60-90 minute focused consultation
- UNA formation and governance planning
- State-specific requirements review

### 2. Document Preparation - $750
- Personalized UNA documents
- Formation guidance
- Custom Articles of Association and Bylaws

### 3. Formation Bundle - $1,000
- Strategy Session + Document Preparation
- Save $100 compared to buying separately
- Priority support and expedited delivery

## Payment Flow

1. User selects service on `/consultation`
2. Redirected to Stripe Checkout
3. Payment processed by Stripe
4. Webhook receives `checkout.session.completed`
5. Payment data saved to `payments.json` (MVP)
6. User redirected to success page

## File Structure

```
api/
├── create-checkout-session.js    # Creates Stripe checkout sessions
└── webhook.js                    # Handles Stripe webhooks

scripts/
└── setup-stripe-products.js      # Creates products and prices

database/
└── schema.sql                    # Database schema for future use

src/
├── lib/
│   └── stripe.ts                 # Stripe configuration and helpers
└── pages/
    └── Consultation.tsx          # Payment page with 3 options
```

## Future Enhancements

- Database integration (PostgreSQL/Supabase)
- Email notifications after payment
- Intake form unlock after payment
- Admin dashboard for payment management
- Automated scheduling integration

## Troubleshooting

### Common Issues

1. **Price ID not found**: Make sure you've run the setup script and updated `.env`
2. **Webhook not receiving events**: Check webhook URL and secret
3. **Payment not saving**: Check file permissions for `payments.json`

### Debug Mode

Enable debug logging by adding to your `.env`:

```env
STRIPE_DEBUG=true
```

## Support

For issues with this integration, check:
1. Stripe Dashboard for payment status
2. Browser console for client-side errors
3. Server logs for API errors
4. `payments.json` for saved payment data


