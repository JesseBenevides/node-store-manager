const connection = require('./connection');

const getAll = async () => {
  const query = 'SELECT * FROM StoreManager.products;';
  const [producs] = await connection.execute(query);

  return producs;
};

module.exports = {
  getAll,
};