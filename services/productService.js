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

const create = async (name, quantity) => {
  const product = await productModel.findByName(name);

  if (product.length !== 0) {
    return { status: 409, message: 'Product already exists' };
  }
  const newProduct = await productModel.create(name, quantity);
  return { status: 201, data: newProduct };
};

const update = async ({ name, quantity, id }) => {
  const product = await productModel.findById(id);
  console.log(product);
  if (product.length === 0) {
    return { status: 404, message: 'Product not found' };
  }

  await productModel.update({ name, quantity, id });

  return { status: 200, data: { name, quantity, id } };
};

module.exports = {
  getAll,
  findById,
  create,
  update,
};