const productService = require('../services/productService');

const getAll = async (_req, res, next) => {
  try {
    const result = await productService.getAll();
    return res.status(result.status).json(result.data);
  } catch (error) {
    next(error);
  }
};

const findById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await productService.findById(id);
    
    if (result.data) {
      return res.status(result.status).json(result.data);
    }
    next(result);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const { name, quantity } = req.body;
    const result = await productService.create(name, quantity);

    if (result.data) {
      return res.status(result.status).json(result.data);
    }
    next(result);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;

    const result = await productService.update({ name, quantity, id: Number(id) });
    if (result.data) {
      return res.status(result.status).json(result.data);
    }
    next(result);
  } catch (error) {
    next(error);
  }
};

const exclude = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await productService.exclude(id);
    
    if (result.data) {
      return res.status(result.status).end();
    }
    next(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  findById,
  create,
  update,
  exclude,
};