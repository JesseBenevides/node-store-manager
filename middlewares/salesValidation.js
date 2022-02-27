const salesSchema = require('../schemas/salesSchema');
const getErrorObj = require('../utils/getErrorObject');

const salesValidation = (req, _res, next) => {
  req.body.map((sale) => {
    const { error } = salesSchema.validate(sale);
    if (error) {
      const errorObj = getErrorObj(error);
      throw errorObj;
    }
    return 0;
  });
  
  next();
};

module.exports = salesValidation;