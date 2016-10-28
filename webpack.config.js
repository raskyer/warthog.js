var webpack = require('webpack');
var PROD = 1;

module.exports = {
  entry: './src/warthog.ts',
  devtool: 'source-map',
  output: {
    path: './dist',
    filename: PROD ? 'bundle.min.js' : 'bundle.js'
  },
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
  },
  module: {
    loaders: [
      { test: /\.ts$/, loader: 'ts-loader' }
    ]
  },
  plugins: PROD ? [
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    })
  ] : []
};
