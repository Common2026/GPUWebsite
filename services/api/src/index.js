"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const stripe_1 = __importDefault(require("stripe"));
// Initialize Stripe with your secret key
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY || "");
// Grab the price ID from environment
const priceId = process.env.PRICE_ID || "";
// Dummy provider logic (replace with your worker functions if needed)
function pickProvider() {
    return { name: "runpod", price_hr: 0.65, gpu: "A100", region: "us-east" };
}
function provision(orderId) {
    return { orderId, endpoint: "https://compute.aps", status: "running" };
}
// Create HTTP server
const server = http_1.default.createServer(async (req, res) => {
    const url = new URL(req.url || "/", "http://localhost");
    res.setHeader("Content-Type", "application/json");
    if (url.pathname === "/health") {
        return res.end(JSON.stringify({ ok: true }));
    }
    if (url.pathname === "/allocate") {
        const provider = pickProvider();
        const allocation = provision("o_" + Date.now());
        return res.end(JSON.stringify({ provider, allocation }));
    }
    if (url.pathname === "/checkout" && req.method === "POST") {
        try {
            const session = await stripe.checkout.sessions.create({
                mode: "payment",
                line_items: [{ price: priceId, quantity: 1 }],
                success_url: "https://your-domain.com/success?session_id={CHECKOUT_SESSION_ID}",
                cancel_url: "https://your-domain.com/cancel",
            });
            return res.end(JSON.stringify({ checkout_url: session.url }));
        }
        catch (e) {
            res.statusCode = 500;
            return res.end(JSON.stringify({ error: e.message }));
        }
    }
    res.statusCode = 404;
    res.end(JSON.stringify({ error: "not_found" }));
});
// Start server
server.listen(4000, () => console.log("API on 4000"));
