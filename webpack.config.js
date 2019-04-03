const path = require('path')
const moment = require('moment')

module.exports = (env) => {
  if(env === 'dev') {
    return {
      entry: path.resolve(__dirname, 'src/public/scripts/main.js'),
      output: {
        filename: 'bundle.js',
        chunkFilename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
      },
      watch: true,
      devtool: 'source-map',
      module: {
        rules: [
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
          },
        ],
      },
    }
  } else {
    return {
      entry: path.resolve(__dirname, 'src/public/scripts/main.js'),
      output: {
        filename: 'bundle.js',
        chunkFilename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
      },
      watch: false,
      devtool: 'source-map',
      module: {
        rules: [
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
          },
        ],
      },
    }
  }
}
