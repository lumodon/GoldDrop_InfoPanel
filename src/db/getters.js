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

module.exports = {
  getBrands,
  getCategories,
  getSalesOrderNumbers,
  getItems,
}
