// In-memory storage (in a real app, this would be a database)
let words = [];

const wordController = {
  getWords: (req, res) => {
    console.log('Handling GET request for words');
    res.json(words);
    console.log(`Successfully returned ${words.length} words`);
  },

  addWord: (req, res) => {
    const { text } = req.body;

    console.log(`Adding new word: ${text}`);
    const word = { text };
    words.push(word);

    res.status(201).json(word);
    console.log(`Successfully added word: ${text}`);
  }
};

module.exports = wordController;