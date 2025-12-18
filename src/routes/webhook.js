// src/routes/webhook.js

import express from "express";
import Stripe from "stripe";
import { saveOrder } from "../db.js";

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post(
  "/stripe",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;

    try {
      // Verify the event with Stripe's signing secret
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.error("⚠️  Webhook signature verification failed:", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle successful payment events
    if (event.type === "payment_intent.succeeded") {
      const paymentIntent = event.data.object;
      try {
        await saveOrder({
          id: paymentIntent.id,
          amount: paymentIntent.amount,
          currency: paymentIntent.currency,
          status: paymentIntent.status,
        });
        console.log("✅ Order saved:", paymentIntent.id);
      } catch (dbErr) {
        console.error("❌ Failed to save order:", dbErr.message);
      }
    }

    res.json({ received: true });
  }
);

export default router;

