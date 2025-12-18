// src/routes/success.js
// Success page route — shows order details after checkout

import express from 'express';
import { getOrder } from '../db.js';

const router = express.Router();

router.get('/success', (req, res) => {
  const sessionId = req.query.session_id;
  if (!sessionId) return res.status(400).send('Missing session_id');

  const order = getOrder(sessionId);
  if (!order) return res.status(404).send('Order not found');

  res.send(`
    <html>
      <head>
        <title>Checkout Success</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; }
          h1 { color: #333; }
          .card { border: 1px solid #ccc; padding: 20px; margin-bottom: 20px; }
          pre { background: #f4f4f4; padding: 10px; }
        </style>
      </head>
      <body>
        <h1>Payment Successful</h1>
        <div class="card">
          <p><strong>Order ID:</strong> ${order.id}</p>
          <p><strong>Status:</strong> ${order.status}</p>
          <p><strong>Email:</strong> ${order.email}</p>
          <p><strong>Amount:</strong> ${order.amount} ${order.currency}</p>
        </div>
        <div class="card">
          <h2>Instance Credentials</h2>
          <pre>
Host: ${order.instanceHost || 'N/A'}
User: ${order.instanceUser || 'N/A'}
Password: ${order.instancePassword || 'N/A'}
Auth Token: ${order.authToken || 'N/A'}
Credential Version: ${order.credentialVersion || 0}
          </pre>
        </div>
        <div class="card">
          <h2>Watchdog Status</h2>
          <p><strong>Last Heartbeat:</strong> ${order.lastHeartbeat || 'pending'}</p>
          <pre>${JSON.stringify(order.lastMetrics || {}, null, 2)}</pre>
        </div>
      </body>
    </html>
  `);
});

export default router;

