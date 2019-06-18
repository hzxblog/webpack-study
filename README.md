# Webpack的学习

跟着官网手册进行练习。

## 单文件入口 ([案例1](./demo01))

webpack.config.js

```js
const path = require('path');

module.exports = {
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  }
};

```

## 多文件入口 ([案例2](./demo02))

```js
const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    main: './index.js',
    app: './app.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  }
};

```
## Loaders ([案例3](./demo03))

webpack只能识别js和json文件，当我们模块中引入其他文件是我们需要使用loaders来处理这些文件

```js
const path = require('path');

module.exports = {
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.png|jpg|gif|svg$/,
        use: ['file-loader']
      }
    ]
  }
};

```

在这里我们引入处理css和图片文件的loader，loader在最顶层有两个属性：
1. test： 识别文件的正则表达式
2. use： 处理该文件中类型文件的loader

## 插件 ([案例4](./demo04))

loaders是为了处理其他文件，而插件可以处理更大范围的任务，如打包优化，资源管理环境变量的注入等。

```js
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
  plugins: [
    new htmlWebpackPlugin({
      template: './index.html'
    })
  ]
};

```
在这个案例中，我们使用了html-webpack-plugin插件，指定了模板路径，打包时自动产出了index.html同时将产出的js文件引入到了index.html中。

可以分别为对各页面导出js

```js
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

```
htmlWebpackPlugin的chunks是enter中chunk的名称。

## 开发模式


