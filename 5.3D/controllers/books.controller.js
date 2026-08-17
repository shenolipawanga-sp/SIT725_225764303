const booksService = require('../services/books.service');

const ALLOWED_FIELDS = ['id', 'title', 'author', 'year', 'genre', 'summary', 'price'];
const REQUIRED_UPDATE_FIELDS = ['title', 'author', 'year', 'genre', 'summary', 'price'];

function findUnknownFields(body) {
  return Object.keys(body).filter((key) => !ALLOWED_FIELDS.includes(key));
}

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

exports.createBook = async (req, res) => {
  try {
    const unknown = findUnknownFields(req.body);
    if (unknown.length > 0) {
      return res.status(400).json({
        message: `Unexpected field(s): ${unknown.join(', ')}`
      });
    }

    const created = await booksService.createBook(req.body);
    res.status(201).json({ data: created });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: err.message });
    }
    if (err.name === 'ValidationError' || err.name === 'CastError') {
      return res.status(400).json({ message: err.message });
    }
    res.status(500).json({ message: 'Failed to create book' });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const unknown = findUnknownFields(req.body);
    if (unknown.length > 0) {
      return res.status(400).json({
        message: `Unexpected field(s): ${unknown.join(', ')}`
      });
    }

    // id is immutable
    if (Object.prototype.hasOwnProperty.call(req.body, 'id') && req.body.id !== req.params.id) {
      return res.status(400).json({ message: 'id is immutable and cannot be changed' });
    }

    const missing = REQUIRED_UPDATE_FIELDS.filter((field) => req.body[field] === undefined);
    if (missing.length > 0) {
      return res.status(400).json({
        message: `Missing required field(s): ${missing.join(', ')}`
      });
    }

    const updateData = { ...req.body };
    delete updateData.id;

    const updated = await booksService.updateBook(req.params.id, updateData);
    if (!updated) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json({ data: updated });
  } catch (err) {
    if (err.name === 'ValidationError' || err.name === 'CastError') {
      return res.status(400).json({ message: err.message });
    }
    res.status(500).json({ message: 'Failed to update book' });
  }
};
