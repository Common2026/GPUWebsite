import express from "express";
import { saveOrder } from "./db.js";

const router = express.Router();

router.post("/stripe", express.json(), (req, res) => {
  const event = req.body;

  switch (event.type) {
    case "payment_intent.succeeded": {
      const pi = event.data.object;
      console.log("💰 PaymentIntent succeeded:", pi.id);
      saveOrder(pi);
      break;
    }
    case "checkout.session.completed": {
      const cs = event.data.object;
      console.log("✅ Checkout session completed:", cs.id);
      saveOrder(cs);
      break;
    }
    default:
      console.log(`ℹ️ Unhandled event type: ${event.type}`);
  }

  res.json({ received: true });
});

export default router;

