const express = require('express');
const productController = require('../controllers/productController');
const productValidation = require('../middlewares/productValidation');

const productRouter = express.Router();

productRouter.get(
  '/',
  productController.getAll,
);

productRouter.get(
  '/:id',
  productController.findById,
);

productRouter.post(
  '/',
  productValidation,
);

module.exports = productRouter;
