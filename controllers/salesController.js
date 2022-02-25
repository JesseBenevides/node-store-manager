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

module.exports = {
  getAll,
  findById,
};