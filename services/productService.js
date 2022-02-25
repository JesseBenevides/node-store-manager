const productModel = require('../models/productModel');

const getProducts = async () => {
  const producs = await productModel.getProducts();
  return producs;
};

module.exports = {
  getProducts,
};