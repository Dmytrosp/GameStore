const Game = require('../models/gamesModel');
const Store = require('../models/storeModel');
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.createGame = factory.createOne(Game);
exports.getGame = factory.getOne(Game);
exports.getAllGames = factory.getAll(Game);
exports.updateGame = factory.updateOne(Game);
exports.deleteGame = catchAsync(async (req, res, next) => {
  const doc = await Game.findById(req.params.id);
  if (!doc) {
    return next(new AppError('No document found with that ID', 404));
  }
  await Store.updateMany(
    { games: doc._id },
    {
      $pull: { games: doc._id },
    }
  );
  await Game.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: 'success',
    data: null,
  });
});
