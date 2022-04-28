const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const BookSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  pages: {
    type: Number,
    required: true
  },
  fiction: {
    type: Boolean,
    required: true
  }
});

module.exports = Book = mongoose.model('books', BookSchema);