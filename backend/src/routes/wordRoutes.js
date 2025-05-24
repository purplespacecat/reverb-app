const express = require('express');
const router = express.Router();
const wordController = require('../controllers/wordController');
const validateWord = require('../middleware/validation');

// GET all words
router.get('/', wordController.getWords);

// POST new word
router.post('/add', validateWord, wordController.addWord);

module.exports = router;