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

## 开发模式 ([案例5](./demo05))

### 设置mode属性为development。

```js
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    publicPath: '/'
  },
   plugins: [
      new htmlWebpackPlugin({
        template: "index.html"
      })
    ]
};

```

### 使用 source maps

当我们将多个文件打包成一个文件时，如果一个文件中出现错误，堆栈跟踪就会直接指向到打包文件，我们无法知道具体是那个文件出错。
这时如果我们使用source maps,source map 就会明确的告诉你那个文件出错。

```js
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './index.js',
  devtool: 'inline-source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    publicPath: '/'
  },
   plugins: [
      new htmlWebpackPlugin({
        template: "index.html"
      })
    ]
};

```
在 err.js中

```js
console.lg()
```
浏览器报错

```js
Uncaught TypeError: console.lg is not a function
    at Object../err.js (err.js:1)
```

### 使用webpack-dev-server
webpack-dev-server 为提供了一个简单的 web服务器，并且具有实时重新加载功能。

```cmd
npm install --S webpack-dev-server
```

```js
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    publicPath: '/'
  },
  devServer: {
    contentBase: './dist',
    port: 8080
  },
  plugins: [
    new htmlWebpackPlugin({
      template: "index.html"
    })
  ]
};
```

```json
{
  "name": "demo01",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "dev": "webpack-dev-server --config webpack.config.js"
  },
  "author": "",
  "license": "ISC"
}

```

## 分离代码  ([案例6](./demo06))

当两个模块引用了同一个模块时，我们期望的是将这个模块单独打包，而不是分别打包到两个模块中造成代码重复。

webpack.config.js
```js
const path = require('path');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: {
    main: './index.js',
    another: './another-module.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/'
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  }
};

```
打包结果 `index.js` 和 `another-module.js` 模块中引用的 `lodash` 被单独打包成 `vendors~another~main.js`;

```js
Built at: 2019-06-18 14:54:31
                  Asset      Size                Chunks             Chunk Names
             another.js  15.2 KiB               another  [emitted]  another
                main.js  15.2 KiB                  main  [emitted]  main
vendors~another~main.js  1.36 MiB  vendors~another~main  [emitted]  vendors~another~main

```

## 缓存

如果每次运行后的文件名不更改，浏览器会认为它没更新，会使用缓存版本。

这时可以通过替换 output.filename 中的 substitutions 设置，来定义输出文件的名称。

```js
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: {
    main: './index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    publicPath: '/'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'cache',
      template: "index.html"
    })
  ]
};

```
### 提取提取引导模板和第三方库

将webpack的runtime代码和第三方库代码单独提取出来，因为这些代码不常修改，在修改源代码从新编译是webpack产出文件时不会修改这些文件名，浏览器会直接提取缓存文件。

```js
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: {
    main: './index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    publicPath: '/'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'cache',
      template: "index.html"
    })
  ],
  optimization: {
    // 提取runtime文件
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        // 提取第三方库代码
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  }
};
```
