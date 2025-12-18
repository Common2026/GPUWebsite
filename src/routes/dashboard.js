// src/routes/dashboard.js
import express from 'express';
import { listOrders } from '../db.js';

const router = express.Router();

router.get('/dashboard', (req, res) => {
  res.json(listOrders());
});

export default router;

