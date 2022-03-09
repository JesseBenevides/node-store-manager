const salesSchema = require('../schemas/salesSchema');
const getErrorObj = require('../utils/getErrorObject');

const salesValidation = (req, _res, next) => {
  const { error } = salesSchema.validate(req.body);
  if (error) {
    const errorObj = getErrorObj(error);
    return next(errorObj);
  }
  next();
};

module.exports = salesValidation;