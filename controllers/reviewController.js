const Review = require('../models/reviewModel');
const Store = require('../models/storeModel');
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.createReview = catchAsync(async (req, res, next) => {
  const doc = await Review.create(req.body);
  if (req.body.store) {
    await Store.findByIdAndUpdate(req.body.store, {
      $push: { reviews: doc._id },
    });
  }

  res.status(201).json({
    status: 'success',
    data: {
      data: doc,
    },
  });
});

exports.getReview = factory.getOne(Review);
exports.getAllReviews = factory.getAll(Review);
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = catchAsync(async (req, res, next) => {
  const doc = await Review.findByIdAndDelete(req.params.id);
  if (!doc) {
    return next(new AppError('No document found with that ID', 404));
  }
  await Store.findByIdAndUpdate(req.params.id, {
    $pull: { reviews: req.params.id },
  });
  res.status(204).json({
    status: 'success',
    data: null,
  });
});
