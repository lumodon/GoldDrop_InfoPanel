const path = require('path')

module.exports = {
  entry: path.resolve(__dirname, 'src/public/scripts/main.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  watch: true
}
