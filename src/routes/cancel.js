// src/routes/cancel.js
// Cancel page route — shown when checkout is abandoned

import express from 'express';

const router = express.Router();

router.get('/cancel', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Checkout Cancelled</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; }
          h1 { color: #c00; }
          .card { border: 1px solid #ccc; padding: 20px; margin-top: 20px; }
        </style>
      </head>
      <body>
        <h1>Checkout Cancelled</h1>
        <div class="card">
          <p>Your payment was not completed. No charges have been made.</p>
          <p>You can return to the <a href="/">homepage</a> to try again.</p>
        </div>
      </body>
    </html>
  `);
});

export default router;

