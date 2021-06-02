const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
  games: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Game',
    },
  ],
  reviews: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Review',
    },
  ],
  name: {
    type: String,
    required: [true, 'There is name?'],
    minLength: [4, 'A name must be longer, than 4 symbols'],
    maxLength: [50, 'A name must be shorter, than 50 symbols'],
  },
  description: {
    type: String,
    required: [true, 'There is description?'],
    minLength: [4, 'A description must be longer, than 4 symbols'],
    maxLength: [
      500,
      'A description must be shorter, than 500 symbols',
    ],
  },
});

storeSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'games',
    select: '-__v',
  }).populate({
    path: 'reviews',
    select: '-__v',
  });
  next();
});

const Store = mongoose.model('Store', storeSchema);

module.exports = Store;
