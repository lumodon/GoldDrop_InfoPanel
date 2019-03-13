const path = require('path')
require('dotenv').config({'path': path.join(__dirname, '../.env')})

const cn = {
  'host': '127.0.0.1',
  'port': 5432,
  'database': 'golddrop_distru',
  'user': process.env.PG_USERNAME || 'username',
  'password': process.env.PG_PASSWORD || 'password',
}
const pgp = require('pg-promise')()

module.exports = pgp(cn)
