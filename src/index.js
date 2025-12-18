const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Health check route
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Root route
app.get('/', (req, res) => {
  res.send('GPU Resale Portal is running');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

