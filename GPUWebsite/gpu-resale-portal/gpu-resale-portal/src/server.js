// gpu-resale-portal/gpu-resale-portal/src/server.js

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Health check route
app.get('/', (req, res) => {
  res.json({ status: 'API running' });
});

// Stripe route (stubbed for now)
app.post('/api/pay/stripe', async (req, res) => {
  res.json({ status: 'Stripe route working', clientSecret: 'test_secret_123' });
});

// PayPal route (stubbed for now)
app.post('/paypal/create-order', async (req, res) => {
  const order = {
    id: 'TEST_ORDER_123',
    status: 'CREATED',
    amount: '49.99',
    currency: 'USD'
  };
  res.json(order);
});

// Webhook route
app.post('/webhook', (req, res) => {
  console.log('Webhook router mounted');
  res.sendStatus(200);
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Portal running on http://localhost:${PORT}`);
});

