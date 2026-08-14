const Book = require('../models/book.model');

const getAllBooks = async () => {
  return Book.find({});
};

const getBookById = async (id) => {
  return Book.findById(id);
};

module.exports = { getAllBooks, getBookById };
