const router = require('express').Router()

router.get('/', (req, res) => {
  console.log('Home Received: ', req.body)
  res.render('home')
})

module.exports = router
