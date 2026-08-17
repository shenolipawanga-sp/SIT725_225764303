const mongoose = require('mongoose');

const CURRENT_YEAR = new Date().getFullYear();

const GENRES = [
  'Fiction',
  'Non-Fiction',
  'Science Fiction',
  'Fantasy',
  'Classic',
  'Historical Fiction',
  'Biography',
  'Other'
];

const bookSchema = new mongoose.Schema({
  id: {
    type: String,
    required: [true, 'id is required'],
    unique: true,
    trim: true,
    minlength: [1, 'id cannot be empty']
  },
  title: {
    type: String,
    required: [true, 'title is required'],
    trim: true,
    minlength: [2, 'title must be at least 2 characters'],
    maxlength: [200, 'title cannot exceed 200 characters']
  },
  author: {
    type: String,
    required: [true, 'author is required'],
    trim: true,
    minlength: [2, 'author must be at least 2 characters'],
    maxlength: [100, 'author cannot exceed 100 characters']
  },
  year: {
    type: Number,
    required: [true, 'year is required'],
    validate: {
      validator: Number.isInteger,
      message: 'year must be a whole number'
    },
    min: [1000, 'year must be 1000 or later'],
    max: [CURRENT_YEAR, `year cannot be later than ${CURRENT_YEAR}`]
  },
  genre: {
    type: String,
    required: [true, 'genre is required'],
    enum: {
      values: GENRES,
      message: 'genre must be one of: ' + GENRES.join(', ')
    }
  },
  summary: {
    type: String,
    required: [true, 'summary is required'],
    trim: true,
    minlength: [20, 'summary must be at least 20 characters'],
    maxlength: [1000, 'summary cannot exceed 1000 characters']
  },
  price: {
    type: mongoose.Schema.Types.Decimal128,
    required: [true, 'price is required'],
    get: (v) => (v ? v.toString() : v),
    validate: {
      validator: function (v) {
        if (v === null || v === undefined) return false;
        const asString = v.toString();
        if (!/^\d+(\.\d{1,2})?$/.test(asString)) return false;
        const asNumber = parseFloat(asString);
        return asNumber > 0 && asNumber <= 999.99;
      },
      message: 'price must be a positive number up to 999.99 with at most 2 decimal places'
    }
  }
}, {
  toJSON: { getters: true },
  toObject: { getters: true }
});

module.exports = mongoose.model('Book', bookSchema);
