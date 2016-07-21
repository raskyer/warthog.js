var webpack = require('webpack');
var PROD = 1;

module.exports = {
  entry: './src/entry.js',
  output: {
    path: './dist',
    filename: PROD ? 'bundle.min.js' : 'bundle.js'
  },
  plugins: PROD ? [
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    })
  ] : []
};
