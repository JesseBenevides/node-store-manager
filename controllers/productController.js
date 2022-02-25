const productService = require('../services/productService');

const getProducts = async (req, res, next) => {
  try {
    const producs = await productService.getProducts();
    return res.status(200).json(producs);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProducts,
};