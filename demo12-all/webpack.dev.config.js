const webpackMerge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config');

module.exports = webpackMerge(webpackBaseConfig, {
  mode: 'development',
  devServer: {
    contentBase: 'dist',
    port: 8000
  }
});
