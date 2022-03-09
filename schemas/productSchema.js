const Joi = require('joi');

const productSchema = Joi.object({
  name: Joi.string().required().min(5)
    .messages({
      'any.required': '"name" is required|400',
      'string.min': '"name" length must be at least 5 characters long|422',
      'string.base': '"name" must be a string|422',
    }),
    quantity: Joi.number().integer().positive().required()
    .messages({
      'any.required': '"quantity" is required|400',
      'number.integer': '"quantity" must be greater than or equal to 1|422',
      'number.positive': '"quantity" must be greater than or equal to 1|422',
      'number.base': '"quantity" must be a number|422',
    }),
});

module.exports = productSchema;

// Formato do esquema feito com a dica do João Nasc e Gaspar na monitoria