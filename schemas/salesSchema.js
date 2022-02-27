const Joi = require('joi');

const salesSchema = Joi.object({
  productId: Joi.required()
    .messages({
      'any.required': '400|"productId" is required',
    }),
  quantity: Joi.number().integer().positive().required()
    .messages({
      'any.required': '400|"quantity" is required',
      'number.integer': '422|"quantity" must be greater than or equal to 1',
      'number.positive': '422|"quantity" must be greater than or equal to 1',
      'number.base': '422|"quantity" must be a number',
    }),
});

module.exports = salesSchema;

// Formato do esquema feito com a dica do João Nasc e Gaspar na monitoria