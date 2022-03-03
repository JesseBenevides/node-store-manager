const salesService = require('../services/salesService');

const getAll = async (req, res, next) => {
  try {
    const result = await salesService.getAll();
    return res.status(result.status).json(result.data);
  } catch (error) {
    next(error);
  }
};

const findById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await salesService.findById(id);

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
    const result = await salesService.create(req.body);

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
    const result = await salesService.update(id, req.body);

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
    const result = await salesService.exclude(id);

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