const express = require('express');
const rescue = require('express-rescue');
const productController = require('../controllers/productController');
const productValidation = require('../middlewares/productValidation');

const productRouter = express.Router();

productRouter.get(
  '/',
  rescue(productController.getAll),
);

productRouter.get(
  '/:id',
  productController.findById,
);

productRouter.post(
  '/',
  productValidation,
  rescue(productController.create),
);

productRouter.put(
  '/:id',
  productValidation,
  rescue(productController.update),
);

productRouter.delete(
  '/:id',
  rescue(productController.exclude),
);

module.exports = productRouter;
