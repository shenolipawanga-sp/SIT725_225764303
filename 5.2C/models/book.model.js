const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  year: { type: Number, required: true },
  genre: { type: String, required: true },
  summary: { type: String, required: true },
  price: {
    type: mongoose.Schema.Types.Decimal128,
    required: true,
    get: (v) => (v ? v.toString() : v)
  }
}, {
  toJSON: { getters: true },
  toObject: { getters: true }
});

module.exports = mongoose.model('Book', bookSchema);
