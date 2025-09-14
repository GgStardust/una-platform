const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const fs = require('fs');
const path = require('path');

// Payment storage file (MVP approach)
const PAYMENTS_FILE = path.join(process.cwd(), 'payments.json');

// Load existing payments
function loadPayments() {
  try {
    if (fs.existsSync(PAYMENTS_FILE)) {
      const data = fs.readFileSync(PAYMENTS_FILE, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error loading payments:', error);
  }
  return [];
}

// Save payments
function savePayments(payments) {
  try {
    fs.writeFileSync(PAYMENTS_FILE, JSON.stringify(payments, null, 2));
  } catch (error) {
    console.error('Error saving payments:', error);
  }
}

// Add new payment
function addPayment(paymentData) {
  const payments = loadPayments();
  payments.push({
    id: paymentData.id,
    stripe_session_id: paymentData.stripe_session_id,
    customer_email: paymentData.customer_email,
    product: paymentData.product,
    amount: paymentData.amount,
    status: paymentData.status,
    created_at: new Date().toISOString(),
  });
  savePayments(payments);
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    console.log('❌ Webhook: Method not allowed:', req.method);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const sig = req.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  console.log('🔔 Webhook received:', {
    hasSignature: !!sig,
    hasSecret: !!endpointSecret,
    bodyLength: req.body?.length || 0
  });

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    console.log('✅ Webhook signature verified successfully');
  } catch (err) {
    console.error('❌ Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  console.log(`🎯 Processing webhook event: ${event.type}`);
  
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      
      console.log('💳 Checkout session completed:', {
        sessionId: session.id,
        customerEmail: session.customer_email || session.customer_details?.email,
        amount: session.amount_total,
        product: session.metadata?.productId
      });
      
      // Extract payment information
      const paymentData = {
        id: session.id,
        stripe_session_id: session.id,
        customer_email: session.customer_email || session.customer_details?.email,
        product: session.metadata?.productId || 'unknown',
        amount: session.amount_total,
        status: 'completed',
      };

      // Save payment
      try {
        addPayment(paymentData);
        console.log('✅ Payment data saved successfully:', paymentData);
      } catch (error) {
        console.error('❌ Error saving payment data:', error);
      }
      break;

    case 'payment_intent.succeeded':
      console.log('✅ PaymentIntent succeeded:', event.data.object.id);
      break;

    case 'payment_intent.payment_failed':
      console.log('❌ PaymentIntent failed:', event.data.object.id);
      break;

    default:
      console.log(`⚠️ Unhandled event type: ${event.type}`);
  }

  console.log('✅ Webhook processed successfully');
  res.status(200).json({ received: true });
}


