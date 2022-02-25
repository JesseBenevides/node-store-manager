const { serializeSales } = require('../utils/serialize');
const connection = require('./connection');

const getAll = async () => {
  const query = `
    SELECT s_p.sale_id, s_p.product_id, s_p.quantity, s.date
    FROM StoreManager.sales_products AS s_p
    INNER JOIN StoreManager.sales AS s
    ON s.id = s_p.sale_id;`;
  const [sales] = await connection.execute(query);

  return sales.map(serializeSales);
};

const findById = async (id) => {
  const query = `
    SELECT s.date, s_p.product_id, s_p.quantity
    FROM StoreManager.sales AS s
    INNER JOIN StoreManager.sales_products AS s_p
    ON s.id = s_p.product_id
    WHERE s_p.sale_id = ?;`;

  const [sale] = await connection.execute(query, [id]);

  return sale.map(serializeSales);
};

module.exports = {
  getAll,
  findById,
};