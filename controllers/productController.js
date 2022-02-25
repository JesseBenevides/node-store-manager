const productService = require('../services/productService');

const getAll = async (req, res, next) => {
  try {
    const producs = await productService.getAll();
    return res.status(200).json(producs);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
};