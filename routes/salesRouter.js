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
  salesController.create,
);

salesRouter.put(
  '/:id',
  salesValidation,
  salesController.update,
);

salesRouter.delete(
  '/:id',
  salesController.exclude,
);

module.exports = salesRouter;
