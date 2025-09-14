const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Product price IDs from environment variables
const PRODUCT_PRICES = {
  strategy_session: process.env.STRIPE_STRATEGY_SESSION_PRICE_ID,
  document_prep: process.env.STRIPE_DOCUMENT_PREP_PRICE_ID,
  bundle: process.env.STRIPE_BUNDLE_PRICE_ID,
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { productId, customerEmail } = req.body;

    if (!productId || !PRODUCT_PRICES[productId]) {
      return res.status(400).json({ error: 'Invalid product ID' });
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: PRODUCT_PRICES[productId],
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.SITE_URL || 'http://localhost:5173'}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.SITE_URL || 'http://localhost:5173'}/services`,
      customer_email: customerEmail,
      metadata: {
        productId: productId,
      },
    });

    res.status(200).json({ sessionId: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
