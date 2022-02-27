const productSchema = require('../schemas/productSchema');
const getErrorObj = require('../utils/getErrorObject');

const productValidation = (req, res, next) => {
  const { error } = productSchema.validate(req.body);
  if (error) {
   const errorObj = getErrorObj(error);
   return next(errorObj);
  }

  return res.status(200).json({ message: 'Validado com sucesso' });
};

module.exports = productValidation;