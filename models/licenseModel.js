const mongoose = require('mongoose');

const licenseSchema = new mongoose.Schema({
  header: {
    type: String,
    required: [true, 'A license must have a header'],
    trim: true,
    minLength: [4, 'A license header must be longer, than 4 symbols'],
    maxLength: [
      100,
      'A license header must be shorter, than 100 symbols',
    ],
  },
  text: {
    type: String,
    trim: true,
    minLength: [8, 'A text must be longer, than 8 symbols'],
    maxLength: [500, 'A text must be shorter, than 500 symbols'],
  },
  price: {
    type: Number,
    min: [1, 'min value is 1'],
    max: [10000, 'max value is 10000'],
    required: [true, 'please set a price'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const License = mongoose.model('License', licenseSchema);

module.exports = License;
