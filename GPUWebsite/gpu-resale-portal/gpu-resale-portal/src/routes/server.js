// src/server.js

import express from "express";
import dotenv from "dotenv";
import webhookRouter from "./routes/webhook.js";

dotenv.config();

const app = express();

// Normal JSON middleware for non-webhook routes
app.use(express.json());

// Mount webhook route
app.use("/webhook", webhookRouter);

// Health check route
app.get("/", (req, res) => {
  res.send("🚀 GPU Resale Portal is live!");
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

