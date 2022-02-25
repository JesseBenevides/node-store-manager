const express = require('express');
const salesController = require('../controllers/salesController');

const salesRouter = express.Router();

salesRouter.get(
  '/',
  salesController.getAll,
);

module.exports = salesRouter;
