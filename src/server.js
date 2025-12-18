// src/server.js

import express from 'express';
import dotenv from 'dotenv';
import Stripe from 'stripe';

dotenv.config();

const app = express();
app.use(express.json());

// Initialize Stripe with the secret key from .env
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Health check route
app.get('/', (req, res) => {
  res.send('GPU Resale Portal is running');
});

// Stripe payment intent route
app.post('/api/pay/stripe', async (req, res) => {
  try {
    const { gpuType, hours, email } = req.body;

    // Example pricing logic (adjust as needed)
    const pricePerHour = gpuType === 'A100' ? 500 : 200;
    const amount = pricePerHour * hours;

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      receipt_email: email,
      description: `GPU rental: ${gpuType} for ${hours} hours`,
      automatic_payment_methods: { enabled: true },
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Stripe error:', error.message);
    res.status(400).json({ error: error.message });
  }
});

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Portal running on http://localhost:${PORT}`);
});

