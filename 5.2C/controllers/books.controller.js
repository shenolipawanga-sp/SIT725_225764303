const booksService = require('../services/books.service');

exports.getAllBooks = async (req, res) => {
  try {
    const books = await booksService.getAllBooks();
    res.json({ data: books });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch books' });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const book = await booksService.getBookById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json({ data: book });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch book' });
  }
};
