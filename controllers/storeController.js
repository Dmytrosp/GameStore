const Store = require('../models/storeModel');
const Game = require('../models/gamesModel');
const Review = require('../models/reviewModel');

const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllStores = factory.getAll(Store);
exports.getStore = factory.getOne(Store);
exports.createStore = factory.createOne(Store);
exports.updateStore = factory.updateOne(Store);
exports.deleteStore = catchAsync(async (req, res, next) => {
  const doc = await Store.findByIdAndDelete(req.params.id);
  if (!doc) {
    return next(new AppError('No document found with that ID', 404));
  }
  if (doc.games) {
    await Promise.all(
      doc.games.map((id) =>
        Game.findByIdAndUpdate(id, {
          $set: { store: null },
        })
      )
    );
  }
  if (doc.reviews) {
    await Promise.all(
      doc.reviews.map((id) =>
        Review.findByIdAndUpdate(id, {
          $set: { store: null },
        })
      )
    );
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
});
