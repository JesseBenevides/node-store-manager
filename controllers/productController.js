const productService = require('../services/productService');

const getAll = async (_req, res, _next) => {
    const result = await productService.getAll();
    return res.status(result.status).json(result.data);
};

const findById = async (req, res, next) => {
    const { id } = req.params;
    const result = await productService.findById(id);
    
    if (result.data) {
      return res.status(result.status).json(result.data);
    }
    next(result);
};

const create = async (req, res, next) => {
    const { name, quantity } = req.body;
    const result = await productService.create(name, quantity);

    if (result.data) {
      return res.status(result.status).json(result.data);
    }
    next(result);
};

const update = async (req, res, next) => {
    const { id } = req.params;
    const { name, quantity } = req.body;

    const result = await productService.update({ name, quantity, id: Number(id) });
    if (result.data) {
      return res.status(result.status).json(result.data);
    }
    next(result);
};

const exclude = async (req, res, next) => {
    const { id } = req.params;
    const result = await productService.exclude(id);
    
    if (result.data) {
      return res.status(result.status).end();
    }
    next(result);
};

module.exports = {
  getAll,
  findById,
  create,
  update,
  exclude,
};