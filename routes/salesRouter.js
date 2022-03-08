const express = require('express');
const rescue = require('express-rescue');
const salesController = require('../controllers/salesController');
const salesValidation = require('../middlewares/salesValidation');

const salesRouter = express.Router();

salesRouter.get(
  '/',
  rescue(salesController.getAll),
);

salesRouter.get(
  '/:id',
  rescue(salesController.findById),
);

salesRouter.post(
  '/',
  salesValidation,
  rescue(salesController.create),
);

salesRouter.put(
  '/:id',
  salesValidation,
  rescue(salesController.update),
);

salesRouter.delete(
  '/:id',
  rescue(salesController.exclude),
);

module.exports = salesRouter;
