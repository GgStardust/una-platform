# Stripe Webhook Setup for Local Development

This guide explains how to set up Stripe webhooks for local development of the UNA Platform.

## Prerequisites

- Stripe account with test mode enabled
- Stripe CLI installed
- UNA Platform running locally

## 1. Install Stripe CLI

### macOS (using Homebrew)
```bash
brew install stripe/stripe-cli/stripe
```

### Other Platforms
Visit [Stripe CLI Documentation](https://stripe.com/docs/stripe-cli) for installation instructions.

## 2. Authenticate with Stripe

```bash
stripe login
```

This will open your browser to authenticate with your Stripe account.

## 3. Start Webhook Forwarding

In a separate terminal window, run:

```bash
stripe listen --forward-to localhost:5173/api/webhook
```

**Important:** Keep this terminal window open during development. The Stripe CLI will forward webhook events to your local server.

## 4. Capture Webhook Signing Secret

After running the `stripe listen` command, you'll see output like:

```
> Ready! Your webhook signing secret is whsec_1234567890abcdef...
```

Copy the webhook signing secret (starts with `whsec_`).

## 5. Update Environment Variables

Update your `.env` file with the webhook signing secret:

```bash
STRIPE_WEBHOOK_SECRET=whsec_1234567890abcdef...
```

## 6. Test Webhook Integration

### Option 1: Use the Test Command
```bash
npm run stripe:test
```

This will trigger a test `checkout.session.completed` event.

### Option 2: Manual Test
1. Go to your local app at `http://localhost:5173`
2. Navigate to `/services`
3. Click "Book Strategy Session" (or any service)
4. Complete the Stripe checkout process
5. Check your terminal logs for webhook events

## 7. Verify Webhook Handler

The webhook handler at `/api/webhook` should:

- ✅ Use `process.env.STRIPE_WEBHOOK_SECRET` for signature verification
- ✅ Listen for `checkout.session.completed` events
- ✅ Log payment data to console
- ✅ Save payment data to `payments.json` (MVP approach)
- ✅ Return `200` status for successful events

## 8. Expected Logs

When a webhook event is received, you should see:

```
Payment completed: {
  id: 'cs_test_...',
  stripe_session_id: 'cs_test_...',
  customer_email: 'test@example.com',
  product: 'strategy_session',
  amount: 25000,
  status: 'completed',
  created_at: '2024-12-19T...'
}
```

## 9. Troubleshooting

### Webhook Not Receiving Events
- Ensure Stripe CLI is running: `stripe listen --forward-to localhost:5173/api/webhook`
- Check that your app is running on port 5173
- Verify the webhook signing secret is correct in `.env`

### Signature Verification Failed
- Double-check `STRIPE_WEBHOOK_SECRET` in `.env`
- Ensure the secret starts with `whsec_`
- Restart your app after updating environment variables

### Events Not Processing
- Check the webhook handler logs in your terminal
- Verify the event type is `checkout.session.completed`
- Check that the webhook endpoint is accessible at `localhost:5173/api/webhook`

## 10. Production Setup

For production, you'll need to:

1. Create a webhook endpoint in your Stripe Dashboard
2. Set the endpoint URL to your production domain: `https://yourdomain.com/api/webhook`
3. Select the events you want to receive (at minimum: `checkout.session.completed`)
4. Copy the webhook signing secret to your production environment variables

## 11. Available Test Commands

```bash
# Test checkout.session.completed event
npm run stripe:test

# Test other events (if needed)
stripe trigger payment_intent.succeeded
stripe trigger payment_intent.payment_failed
```

## 12. Webhook Events Handled

The UNA Platform currently handles these Stripe webhook events:

- `checkout.session.completed` - When a payment is successfully completed
- `payment_intent.succeeded` - When a payment intent succeeds (logged only)
- `payment_intent.payment_failed` - When a payment intent fails (logged only)

## 13. Development Workflow

1. Start your app: `npm run dev`
2. Start webhook forwarding: `stripe listen --forward-to localhost:5173/api/webhook`
3. Update `.env` with webhook secret
4. Test payments or run `npm run stripe:test`
5. Check logs for webhook events

## 14. Security Notes

- Never commit real webhook secrets to version control
- Use test mode keys for development
- Verify webhook signatures in production
- Monitor webhook delivery in Stripe Dashboard

## 15. Next Steps

Once webhooks are working locally:

1. Test the complete payment flow
2. Verify payment data is being stored correctly
3. Test the booking and intake form integration
4. Set up production webhook endpoints
5. Monitor webhook delivery and error rates

---

For more information, see the [Stripe Webhooks Documentation](https://stripe.com/docs/webhooks).
