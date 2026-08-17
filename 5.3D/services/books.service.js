const Book = require('../models/book.model');

const getAllBooks = async () => {
  return Book.find({});
};

const getBookById = async (id) => {
  return Book.findOne({ id });
};

const createBook = async (bookData) => {
  if (bookData.id) {
    const existing = await Book.findOne({ id: bookData.id });
    if (existing) {
      const err = new Error('A book with this id already exists');
      err.code = 11000;
      throw err;
    }
  }

  const book = new Book(bookData);
  return book.save();
};

const updateBook = async (id, updateData) => {
  return Book.findOneAndUpdate(
    { id },
    updateData,
    { new: true, runValidators: true, context: 'query' }
  );
};

module.exports = { getAllBooks, getBookById, createBook, updateBook };
