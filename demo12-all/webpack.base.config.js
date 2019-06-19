const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { DefinePlugin } = require('webpack');

module.exports = {
  entry: {
    main: './src/index.js'
  },
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.png|jpg|gif|svg$/,
        use: ['file-loader']
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'all-demo',
      template: 'index.html'
    }),
    // 单独打包css文件
    new MiniCssExtractPlugin({
      filename: '[hash].css',
      chunkFilename: '[id].[hash].css',
    }),
    new DefinePlugin({
      'process.env': process.env
    })
  ]
};
