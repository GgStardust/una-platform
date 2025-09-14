const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3001; // Different port for API server

// Middleware
app.use(cors());
app.use(express.json());

// Import API handlers
const createCheckoutSession = require('./api/create-checkout-session.js');
const webhook = require('./api/webhook.js');

// API Routes
app.post('/api/create-checkout-session', createCheckoutSession);
app.post('/api/webhook', webhook);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'API server running' });
});

app.listen(PORT, () => {
  console.log(`🚀 API Server running on http://localhost:${PORT}`);
  console.log(`📡 Available endpoints:`);
  console.log(`   POST /api/create-checkout-session`);
  console.log(`   POST /api/webhook`);
  console.log(`   GET  /api/health`);
});
