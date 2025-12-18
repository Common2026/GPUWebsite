import http from "http";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");
const priceId = process.env.PRICE_ID || "price_test123";

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url || "/", "http://localhost");
  res.setHeader("Content-Type", "application/json");

  if (url.pathname === "/health") {
    res.end(JSON.stringify({ ok: true }));
    return;
  }

  if (url.pathname === "/allocate") {
    const provider = { name: "runpod", price_hr: 0.65, gpu: "A100", region: "us-east" };
    const allocation = { orderId: "o_" + Date.now(), endpoint: "https://compute.aps", status: "running" };
    res.end(JSON.stringify({ provider, allocation }));
    return;
  }

  if (url.pathname === "/checkout" && req.method === "POST") {
    try {
      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        line_items: [
          {
            price: priceId,
            quantity: 1
          }
        ],
        success_url: "http://localhost:4000/success?session_id={CHECKOUT_SESSION_ID}",
        cancel_url: "http://localhost:4000/cancel"
      });
      res.end(JSON.stringify({ checkout_url: session.url }));
      return;
    } catch (e: any) {
      res.statusCode = 500;
      res.end(JSON.stringify({ error: e.message }));
      return;
    }
  }

  res.statusCode = 404;
  res.end(JSON.stringify({ error: "not_found" }));
});

server.listen(4000, () => console.log("API on 4000"));

