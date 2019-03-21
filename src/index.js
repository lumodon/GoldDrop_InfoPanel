const express = require('express')
const path = require('path')
const app = express()
const https = require('https')
require('dotenv').config({ 'path': path.join(__dirname, '../.env') })
const bodyParser = require('body-parser')

const PORT = process.env.PORT
const securePort = process.env.SECURE_PORT

app.use(bodyParser.json())

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views/pages'))

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'public/stylesheets')))
app.use(express.static(path.join(__dirname, 'public/scripts')))
app.use(express.static(path.join(__dirname, 'public/images')))

app.use('/', require('./routes'))
app.use((req, res) => {
  void req
  console.log('NOT FOUND')
  res.status(404).render('not_found')
})

const fs = require('fs')
https.createServer({
  'key': fs.readFileSync(path.join(__dirname, '../certs/privkey.pem')),
  'cert': fs.readFileSync(path.join(__dirname, '../certs/fullchain.pem')),
}, app)
  .listen(securePort, () => {
    console.log(`Server running on https://localhost:${securePort}`)
  })

app.listen(PORT, () => {
  console.log(`http://127.0.0.1:${PORT}/`)
})
