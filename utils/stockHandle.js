const productModel = require('../models/productModel');
const salesModel = require('../models/salesModel');

const hasStock = async (itemList) => {
  const result = await itemList.reduce(async (acc, item) => {
    const [product] = await productModel.findById(item.productId);
    if (item.quantity > product.quantity) {
      return acc + 1;
    }
    return acc;
  }, 0);
  return !result;
};

const decreaseStock = async (itemList) => {
  itemList.forEach(async (item) => {
    const [product] = await productModel.findById(item.productId);
    const newQuantity = product.quantity - item.quantity;
    await productModel.update({ ...product, quantity: newQuantity });
  });
};

const increaseStock = async (saleId) => {
  const itemList = await salesModel.findById(saleId);

  itemList.forEach(async (item) => {
    const [product] = await productModel.findById(item.productId);
    const newQuantity = product.quantity + item.quantity;
    await productModel.update({ ...product, quantity: newQuantity });
  });
};

module.exports = {
  hasStock,
  increaseStock,
  decreaseStock,
};