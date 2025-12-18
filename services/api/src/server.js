// server.js
const express = require('express');
const fetch = require('node-fetch');
const Stripe = require('stripe');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// --- PayPal create-order route ---
app.post('/paypal/create-order', async (req, res) => {
  try {
    const auth = Buffer.from(
      process.env.PAYPAL_CLIENT_ID + ':' + process.env.PAYPAL_SECRET
    ).toString('base64');

    // Get access token
    const tokenResponse = await fetch('https://api-m.sandbox.paypal.com/v1/oauth

