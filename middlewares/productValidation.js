const productSchema = require('../schemas/productSchema');
const getErrorObj = require('../utils/getErrorObject');

const productValidation = (req, _res, next) => {
  const { error } = productSchema.validate(req.body);
  if (error) {
   const errorObj = getErrorObj(error);
   return next(errorObj);
  }

  next();
};

module.exports = productValidation;