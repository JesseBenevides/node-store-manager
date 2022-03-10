const salesModel = require('../models/salesModel');
const { hasStock, decreaseStock, increaseStock } = require('../utils/stockHandle');

const getAll = async () => {
  const sales = await salesModel.getAll();

  return { status: 200, data: sales };
};

const findById = async (id) => {
  const sales = await salesModel.findById(id);

  if (sales.length === 0) {
    return { status: 404, message: 'Sale not found' };
  }
  return { status: 200, data: sales };
};

const create = async (itemList) => {
  if (!await hasStock(itemList)) {
    return { status: 422, message: 'Such amount is not permitted to sell' };
  }
  decreaseStock(itemList);

  const saleId = await salesModel.createSale();
  const data = await salesModel.createItems(saleId, itemList);
  return (data
    ? { status: 201, data }
    : { status: 500, message: 'Somethig went wrong' }
  );
};

const update = async (saleId, itemList) => {
  const sales = await salesModel.findById(saleId);

  if (sales.length === 0) {
    return { status: 404, message: 'Sale not found' };
  }

  const data = await salesModel.update(saleId, itemList);
  return (data
    ? { status: 200, data }
    : { status: 500, message: 'Somethig went wrong' }
  );
};

const exclude = async (saleId) => {
  const sales = await salesModel.findById(saleId);

  if (sales.length === 0) {
    return { status: 404, message: 'Sale not found' };
  }

  await increaseStock(saleId);
  const result = await salesModel.exclude(saleId);
  
  return (result
    ? { status: 204, data: result }
    : { satus: 500, message: 'Something went wrong' }
  );
};

module.exports = {
  getAll,
  findById,
  create,
  update,
  exclude,
};
