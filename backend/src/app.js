const express = require('express');
const cors = require('cors');
const wordRoutes = require('./routes/wordRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  maxAge: 86400
}));

// Routes
app.use('/api/words', wordRoutes);

// Error handling
app.use(errorHandler);

module.exports = app;