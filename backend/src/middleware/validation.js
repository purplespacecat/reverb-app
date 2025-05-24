const validateWord = (req, res, next) => {
  const { text } = req.body;

  if (!text) {
    console.log('Empty word received');
    return res.status(400).json({ error: 'Word cannot be empty' });
  }

  next();
};

module.exports = validateWord;