const express = require('express');
const salesController = require('../controllers/salesController');
const salesValidation = require('../middlewares/salesValidation');

const salesRouter = express.Router();

salesRouter.get(
  '/',
  salesController.getAll,
);

salesRouter.get(
  '/:id',
  salesController.findById,
);

salesRouter.post(
  '/',
  salesValidation,
);

module.exports = salesRouter;
