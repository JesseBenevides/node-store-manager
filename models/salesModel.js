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
    ON s.id = s_p.sale_id
    WHERE s_p.sale_id = ?;`;

  const [sale] = await connection.execute(query, [id]);

  return sale.map(serializeSales);
};

const createSale = async () => {
  const query = 'INSERT INTO StoreManager.sales (date) VALUES (now());';

  const [result] = await connection.execute(query);
  return result.insertId;
};

const createItems = async (saleId, itemList) => {
  if (!saleId) return null;

  const query = `
    INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity)
    VALUES (?, ?, ?);`;

  itemList.forEach(async (sale) => {
    await connection.execute(query, [saleId, sale.productId, sale.quantity]);
  });

  return { id: saleId, itemsSold: itemList };
};

const excludeItems = async (saleId) => {
  const query = 'DELETE FROM StoreManager.sales_products WHERE sale_id=?;';
  const [result] = await connection.execute(query, [saleId]);
  return (!!result.affectedRows);
};

const exclude = async (saleId) => {
  await excludeItems(saleId);

  const query = 'DELETE FROM StoreManager.sales WHERE id=?';
  const [result] = await connection.execute(query, [saleId]);
  return (!!result.affectedRows);
};

const update = async (saleId, itemList) => {
  await excludeItems(saleId);
  const { id, itemsSold } = await createItems(saleId, itemList);
  return { saleId: id, itemUpdated: itemsSold };
};

module.exports = {
  getAll,
  findById,
  createItems,
  createSale,
  update,
  exclude,
  excludeItems,
};