const salesService = require('../services/salesService');

const getAll = async (_req, res, _next) => {
    const result = await salesService.getAll();
    return res.status(result.status).json(result.data);
};

const findById = async (req, res, next) => {
    const { id } = req.params;
    const result = await salesService.findById(id);

    if (result.data) {
      return res.status(result.status).json(result.data);
    }
    next(result);
};

const create = async (req, res, next) => {
    const result = await salesService.create(req.body);

    if (result.data) {
      return res.status(result.status).json(result.data);
    }
    next(result);
};

const update = async (req, res, next) => {
    const { id } = req.params;
    const result = await salesService.update(id, req.body);

    if (result.data) {
      return res.status(result.status).json(result.data);
    }
    next(result);
};

const exclude = async (req, res, next) => {
    const { id } = req.params;
    const result = await salesService.exclude(id);

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