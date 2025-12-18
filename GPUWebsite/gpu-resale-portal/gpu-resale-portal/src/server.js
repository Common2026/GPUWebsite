import express from 'express';
import cors from 'cors';
import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.get('/debug/key', (req, res) => {
  res.send(process.env.STRIPE_SECRET_KEY || 'No key loaded');
});

app.post('/api/pay/stripe', async (req, res) => {
  try {
    const { gpuType, hours, email } = req.body;
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

app.listen(PORT, () => {
  console.log(`Portal running on http://localhost:${PORT}`);
});

