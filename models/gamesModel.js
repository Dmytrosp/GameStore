const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name!'],
    minLength: [2, 'A name must be longer, than 2 symbols'],
    maxLength: [50, 'A name must be shorter, than 50 symbols'],
  },
  store: {
    type: mongoose.Schema.ObjectId,
    ref: 'Store',
    default: null,
  },
});

gameSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'store',
    select: '-__v -games',
  });
  next();
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
