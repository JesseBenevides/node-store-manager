const Joi = require('joi');

const productSchema = Joi.object({
  name: Joi.string().required().min(5)
    .messages({
      'any.required': '400|"name" is required',
      'string.min': '422|"name" length must be at least 5 characters long',
      'string.base': '422|"name" must be a string',
    }),
    quantity: Joi.number().integer().positive().required()
    .messages({
      'any.required': '400|"quantity" is required',
      'number.integer': '422|"quantity" must be greater than or equal to 1',
      'number.positive': '422|"quantity" must be greater than or equal to 1',
      'number.base': '422|"quantity" must be a number',
    }),
});

module.exports = productSchema;

// Formato do esquema feito com a dica do João Nasc e Gaspar na monitoria