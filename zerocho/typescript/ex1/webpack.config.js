const path = require('path');
const webpack = require('webpack')

module.exports = {
  mode: 'development',
  // devtool: 'eval', //hidden-source-map 소스숨김,
  devtool: 'inline-source-map',
  resolve:{
    extensions: ['jsx', '.js', 'tsx', '.ts'],

  },
  entry: {
    app: './src/index'
  },
  module:{
    rules: [{
      test: /\.tsx?$/,
        use: 'awesome-typescript-loader'
    }]
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
};