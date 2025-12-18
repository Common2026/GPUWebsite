// src/routes/heartbeat.js
// Heartbeat route — watchdog agent posts status updates

import express from 'express';
import { updateOrder, getOrder } from '../db.js';

const router = express.Router();

router.post('/heartbeat', (req, res) => {
  const { id, authToken, metrics } = req.body;

  if (!id || !authToken) {
    return res.status(400).send('Missing id or authToken');
  }

  const order = getOrder(id);
  if (!order) {
    return res.status(404).send('Order not found');
  }

  if (order.authToken !== authToken) {
    return res.status(403).send('Invalid authToken');
  }

  const now = new Date().toISOString();
  updateOrder(id, {
    lastHeartbeat: now,
    lastMetrics: metrics || {}
  });

  console.log(`✅ Heartbeat received for order ${id} at ${now}`);
  res.json({ status: 'ok', timestamp: now });
});

export default router;

