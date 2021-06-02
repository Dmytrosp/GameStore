const mongoose = require('mongoose');

const taxesSchema = new mongoose.Schema({
  header: {
    type: String,
    minLength: [1, 'An header must be longer, than 1 symbol'],
    maxLength: [100, 'A header must be shorter, than 500 symbols'],
  },
  text: {
    type: String,
    required: [true, 'There is text?'],
    minLength: [1, 'A text must be longer, than 1 symbol'],
    maxLength: [500, 'A text must be shorter, than 500 symbols'],
  },
});

const Taxes = mongoose.model('Taxes', taxesSchema);

module.exports = Taxes;
