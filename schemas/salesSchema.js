const Joi = require('joi');

const salesSchema = Joi.object({
  productId: Joi.required()
    .messages({
      'any.required': '"productId" is required|400',
    }),
  quantity: Joi.number().integer().positive().required()
    .messages({
      'any.required': '"quantity" is required|400',
      'number.integer': '"quantity" must be greater than or equal to 1|422',
      'number.positive': '"quantity" must be greater than or equal to 1|422',
      'number.base': '"quantity" must be a number|422',
    }),
});

module.exports = salesSchema;

// Formato do esquema feito com a dica do João Nasc e Gaspar na monitoria