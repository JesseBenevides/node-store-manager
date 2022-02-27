const salesSchema = require('../schemas/salesSchema');
const getErrorObj = require('../utils/getErrorObject');

const salesValidation = (req, res, _next) => {
  req.body.map((sale) => {
    const { error } = salesSchema.validate(sale);
    if (error) {
      const errorObj = getErrorObj(error);
      throw errorObj;
    }
    return 0;
  });
  
  return res.status(200).json({ message: 'Validado com sucesso' });
};

module.exports = salesValidation;