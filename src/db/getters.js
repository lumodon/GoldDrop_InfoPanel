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
    SELECT * FROM items
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
