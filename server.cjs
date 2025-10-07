const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;
const VITE_PORT = 5173;

// Middleware
app.use(express.json());
app.use(express.static('dist'));

// Import API routes (only if Stripe is configured)
let createCheckoutSession, webhook;
try {
  if (process.env.STRIPE_SECRET_KEY && process.env.STRIPE_SECRET_KEY !== 'sk_test_placeholder_key_for_development') {
    createCheckoutSession = require('./api/create-checkout-session.js');
    webhook = require('./api/webhook.js');
  }
} catch (error) {
  console.log('Stripe API routes not loaded - missing or invalid Stripe configuration');
}

// API Routes (only if Stripe is configured)
if (createCheckoutSession) {
  app.post('/api/create-checkout-session', (req, res) => {
    const handler = createCheckoutSession.default || createCheckoutSession;
    return handler(req, res);
  });
} else {
  app.post('/api/create-checkout-session', (req, res) => {
    res.status(503).json({ error: 'Payment processing not configured' });
  });
}

if (webhook) {
  app.post('/api/webhook', (req, res) => {
    const handler = webhook.default || webhook;
    return handler(req, res);
  });
} else {
  app.post('/api/webhook', (req, res) => {
    res.status(503).json({ error: 'Webhook processing not configured' });
  });
}

// Proxy all other requests to Vite dev server
app.use('/', createProxyMiddleware({
  target: `http://localhost:${VITE_PORT}`,
  changeOrigin: true,
  ws: true, // Enable WebSocket proxying for HMR
  // Exclude API routes from proxying
  filter: (pathname, req) => {
    return !pathname.startsWith('/api/');
  }
}));

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Express server running on http://localhost:${PORT}`);
  console.log(`📡 API endpoints available at http://localhost:${PORT}/api/`);
  console.log(`🔄 Proxying frontend requests to Vite on port ${VITE_PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 Shutting down Express server...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('🛑 Shutting down Express server...');
  process.exit(0);
});
