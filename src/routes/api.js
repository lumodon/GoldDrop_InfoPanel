const router = require('express').Router()
const {
  getBrands,
  getCategories,
  getSalesOrderNumbers,
  getItems,
} = require('../db/getters')

router.post('/', (req, res) => {
  void req

  res.send(JSON.stringify({
    'version': '0.1.0-alpha.1'
  }))
})

router.post('/populatedata', (req, res) => {
  void req

  Promise.all([
    getBrands(),
    getCategories(),
    getSalesOrderNumbers(),
    getItems(),
  ]).then(([ brands, categories, salesOrderNumbers, items ]) => {
    res.send(JSON.stringify({ brands, categories, salesOrderNumbers, items }))
  })
})

module.exports = router
