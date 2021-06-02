const License = require('../models/licenseModel');

const factory = require('./handlerFactory');

exports.getAllLicenses = factory.getAll(License);
exports.getLicense = factory.getOne(License);
exports.createLicense = factory.createOne(License);
exports.updateLicense = factory.updateOne(License);
exports.deleteLicense = factory.deleteOne(License);
