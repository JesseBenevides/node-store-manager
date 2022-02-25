const productModel = require('../models/productModel');

const getAll = async () => {
  const products = await productModel.getAll();
  return { status: 200, data: products };
};

const findById = async (id) => {
  const product = await productModel.findById(id);

  if (product.length === 0) {
    return { status: 404, message: 'Product not found' };
  }
  return { status: 200, data: product[0] };
};

module.exports = {
  getAll,
  findById,
};