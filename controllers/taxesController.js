const Taxes = require('../models/taxesModel');

const factory = require('./handlerFactory');

exports.getAllTaxeses = factory.getAll(Taxes);
exports.getTaxes = factory.getOne(Taxes);
exports.createTaxes = factory.createOne(Taxes);
exports.updateTaxes = factory.updateOne(Taxes);
exports.deleteTaxes = factory.deleteOne(Taxes);
