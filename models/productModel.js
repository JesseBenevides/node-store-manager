const connection = require('./connection');

const getAll = async () => {
  const query = 'SELECT * FROM StoreManager.products;';
  const [producs] = await connection.execute(query);

  return producs;
};

const findById = async (id) => {
  const query = 'SELECT * FROM StoreManager.products WHERE id = ?;';
  const [product] = await connection.execute(query, [id]);

  return product;
};

const findByName = async (name) => {
  const query = 'SELECT * FROM StoreManager.products WHERE name=?;';
  const [product] = await connection.execute(query, [name]);
  return product;
};

const create = async (name, quantity) => {
  const query = 'INSERT INTO StoreManager.products (name, quantity) VALUES (?, ?);';
  const [response] = await connection.execute(query, [name, quantity]);
  return { id: response.insertId, name, quantity };
};

const update = async ({ name, quantity, id }) => {
  const query = `
    UPDATE StoreManager.products
    SET name = ?, quantity = ?
    WHERE id = ?;`;
  const [result] = await connection.execute(query, [name, quantity, id]);
  return result;
};

const exclude = async (id) => {
  const query = 'DELETE FROM StoreManager.products WHERE id=?;';
  const [result] = await connection.execute(query, [id]);
  return result;
};

module.exports = {
  getAll,
  findById,
  findByName,
  create,
  update,
  exclude,
};