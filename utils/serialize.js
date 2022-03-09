const serializeSales = (salesData) => ({
  date: salesData.date,
  quantity: salesData.quantity,
  productId: salesData.product_id,
  saleId: salesData.sale_id,
});

module.exports = {
  serializeSales,
};