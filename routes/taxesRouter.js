const express = require('express');
const taxesController = require('../controllers/taxesController');

const router = express.Router();

router
  .route('/')
  .get(taxesController.getAllTaxeses)
  .post(taxesController.createTaxes);

router
  .route('/:id')
  .get(taxesController.getTaxes)
  .patch(taxesController.updateTaxes)
  .delete(taxesController.deleteTaxes);

module.exports = router;
