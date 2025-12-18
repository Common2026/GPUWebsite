// gpu-resale-portal/gpu-resale-portal/src/server.js

const express = require('express');
const bodyParser = require('body-parser');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // set in Render env vars
const fetch = require('node-fetch');

const app = express();
app.use(bodyParser.json());

// Health check
app.get('/', (req, res) => {
  res.send({ status: 'API running' });
});

// Stripe payment route
app.post('/api/pay/stripe', async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 5000, // cents
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Stripe payment failed' });
  }
});

// PayPal order creation route
app.post('/paypal/create-order', async (req, res) => {
  try {
    // Normally you’d call PayPal’s API here with your client ID/secret
    const order = {
      id: 'TEST_ORDER_123',
      status: 'CREATED',
      amount: '49.99',
      currency: 'USD',
    };
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'PayPal order failed' });
  }
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

