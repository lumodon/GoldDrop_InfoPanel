const db = require('./pgp')

function getBrands() {
  return db.any(`
    SELECT * FROM brands;
  `)
}

function getCategories() {
  return db.any(`
    SELECT * FROM categories;
  `)
}

function getSalesOrderNumbers() {
  return db.any(`
    SELECT * FROM sales;
  `)
}

function getItems() {
  return db.any(`
    SELECT * FROM items
  `)
}

function getPods() {
  return db.any(`
    SELECT items.total_value as items_total_value,
    sales.total_value as sales_total_value,
    sales_order,
    id,
    belongs_to_brand,
    href,
    url_u,
    cost_per_unit,
    quantity,
    unit_name,
    customer,
    sample_value,
    due_date_epoch,
    order_date_epoch,
    current_status
    FROM items
    JOIN sales
    ON sales_order = belongs_to_salesorder
    WHERE unit_category = 'Pods';
  `)
}

module.exports = {
  getBrands,
  getCategories,
  getSalesOrderNumbers,
  getItems,
  getPods,
}
