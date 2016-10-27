var webpack = require('webpack');

var PROD = 1;

module.exports = {

  entry: './core.js',
  devtool: 'source-map',
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
