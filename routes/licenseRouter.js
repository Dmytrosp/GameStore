const express = require('express');
const licenseController = require('../controllers/licenseController');

const router = express.Router();

router
  .route('/')
  .get(licenseController.getAllLicenses)
  .post(licenseController.createLicense);

router
  .route('/:id')
  .get(licenseController.getLicense)
  .patch(licenseController.updateLicense)
  .delete(licenseController.deleteLicense);

module.exports = router;
