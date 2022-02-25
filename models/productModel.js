const connection = require('./connection');

const getProducts = async () => {
  const query = 'SELECT * FROM StoreManager.products';
  const [producs] = await connection.execute(query);

  return producs;
};

module.exports = {
  getProducts,
};