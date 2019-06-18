const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    main: './index.js',
    app: './app.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  plugins: [
    new htmlWebpackPlugin({
      filename: 'index.html',
      template: './index.html',
      chunks: ['main']
    }),
    new htmlWebpackPlugin({
      filename: 'main.html',
      template: './main.html',
      chunks: ['app']
    }),
  ]
};
