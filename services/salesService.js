const salesModel = require('../models/salesModel');

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

module.exports = {
  getAll,
  findById,
};
