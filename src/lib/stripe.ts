import { loadStripe } from '@stripe/stripe-js';

// Stripe configuration
export const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

// Product definitions
export const STRIPE_PRODUCTS = {
  STRATEGY_SESSION: {
    id: 'strategy_session',
    name: 'UNA Strategy Session',
    description: '60-90 minute focused consultation to plan your UNA formation and governance',
    price: 25000, // $250.00 in cents
    priceId: 'price_strategy_session', // Will be set after creating in Stripe
  },
  DOCUMENT_PREP: {
    id: 'document_prep',
    name: 'UNA Document Preparation',
    description: 'Complete package with personalized UNA documents and formation guidance',
    price: 75000, // $750.00 in cents
    priceId: 'price_document_prep', // Will be set after creating in Stripe
  },
  BUNDLE: {
    id: 'bundle',
    name: 'UNA Formation Bundle',
    description: 'Strategy Session + Document Preparation (Save $100)',
    price: 100000, // $1000.00 in cents
    priceId: 'price_bundle', // Will be set after creating in Stripe
  },
} as const;

// Stripe checkout session creation
export const createCheckoutSession = async (productId: keyof typeof STRIPE_PRODUCTS, customerEmail?: string) => {
  try {
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productId,
        customerEmail,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create checkout session');
    }

    const { sessionId } = await response.json();
    return sessionId;
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
};

// Redirect to Stripe Checkout
export const redirectToCheckout = async (productId: keyof typeof STRIPE_PRODUCTS, customerEmail?: string) => {
  try {
    const stripe = await stripePromise;
    if (!stripe) {
      throw new Error('Stripe failed to load');
    }

    const sessionId = await createCheckoutSession(productId, customerEmail);
    
    const { error } = await stripe.redirectToCheckout({
      sessionId,
    });

    if (error) {
      console.error('Stripe checkout error:', error);
      throw error;
    }
  } catch (error) {
    console.error('Error redirecting to checkout:', error);
    throw error;
  }
};


