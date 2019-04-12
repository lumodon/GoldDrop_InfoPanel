const router = require('express').Router()
const {
  getBrands,
  getSalesReport,
  getCategories,
  getSalesOrderNumbers,
  getItems,
  getPods,
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
    getSalesReport(),
    getCategories(),
    getSalesOrderNumbers(),
    getItems(),
    getPods(),
  ]).then(([ brands, salesReport, categories, salesOrderNumbers, items, podData ]) => {
    res.send(JSON.stringify({ brands, salesReport, categories, salesOrderNumbers, items, podData }))
  })
})

module.exports = router
