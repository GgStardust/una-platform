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

// Import API routes
const createCheckoutSession = require('./api/create-checkout-session.js');
const webhook = require('./api/webhook.js');

// API Routes
app.post('/api/create-checkout-session', (req, res) => {
  const handler = createCheckoutSession.default || createCheckoutSession;
  return handler(req, res);
});

app.post('/api/webhook', (req, res) => {
  const handler = webhook.default || webhook;
  return handler(req, res);
});

// Proxy all other requests to Vite dev server
app.use('*', createProxyMiddleware({
  target: `http://localhost:${VITE_PORT}`,
  changeOrigin: true,
  ws: true, // Enable WebSocket proxying for HMR
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
