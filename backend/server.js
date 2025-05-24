const express = require('express');
const cors = require('cors');

const app = express();
const port = 8080;

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  maxAge: 86400 // 24 hours
}));

// In-memory storage for words
let words = [];

// GET /api/words
app.get('/api/words', (req, res) => {
  console.log('Handling GET request for words');
  res.json(words);
  console.log(`Successfully returned ${words.length} words`);
});

// POST /api/words/add
app.post('/api/words/add', (req, res) => {
  const { text } = req.body;

  if (!text) {
    console.log('Empty word received');
    return res.status(400).json({ error: 'Word cannot be empty' });
  }

  console.log(`Adding new word: ${text}`);
  const word = { text };
  words.push(word);

  res.status(201).json(word);
  console.log(`Successfully added word: ${text}`);
});

// Start the server
app.listen(port, () => {
  console.log(`Server starting on port ${port}...`);
});