const path = require('path')
require('dotenv').config({'path': path.join(__dirname, '../.env')})

const cn = {
  'host': process.env.PG_HOST,
  'port': 5432,
  'database': process.env.PG_DBNAME,
  'user': process.env.PG_USERNAME || 'username',
  'password': process.env.PG_PASSWORD || 'password',
}
const pgp = require('pg-promise')()

module.exports = pgp(cn)
