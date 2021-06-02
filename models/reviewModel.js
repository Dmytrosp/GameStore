const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  header: {
    type: String,
    required: [true, 'A review must have a header'],
    trim: true,
    minLength: [4, 'A review header must be longer, than 8 symbols'],
    maxLength: [
      100,
      'A review header must be shorter, than 100 symbols',
    ],
  },
  text: {
    type: String,
    trim: true,
    minLength: [8, 'A review text must be longer, than 8 symbols'],
    maxLength: [
      500,
      'A review text must be shorter, than 500 symbols',
    ],
  },
  rate: {
    type: Number,
    min: [1, 'min value is 1'],
    max: [5, 'min value is 5'],
    required: [true, 'please set a rate'],
  },
  store: {
    type: mongoose.Schema.ObjectId,
    ref: 'Store',
    default: null,
  },
});

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'store',
    select: '-__v -reviews',
  });
  next();
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
