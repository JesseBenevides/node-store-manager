const productModel = require('../models/productModel');

const getAll = async () => {
  const producs = await productModel.getAll();
  return producs;
};

module.exports = {
  getAll,
};