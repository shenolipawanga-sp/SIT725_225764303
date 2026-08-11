const booksService = require('../services/books.service');

exports.getAllBooks = (req, res) => {
  const books = booksService.getAllBooks();
  res.json({ data: books });
};

exports.getBookById = (req, res) => {
  const book = booksService.getBookById(req.params.id);

  if (!book) {
    return res.status(404).json({ message: 'Book not found' });
  }

  res.json({ data: book });
};