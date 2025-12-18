// src/index.js
import express from 'express';

const app = express();

// Middleware
app.use(express.json());

// Health check
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Root route (optional)
app.get('/', (_req, res) => {
  res.status(200).json({ message: 'AI Processing Solutions API' });
});

// Start server — MUST use Render’s assigned port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

