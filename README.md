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

## 缓存 ([案例7](./demo07))

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

更详细的[文档](https://webpack.js.org/guides/caching/)

> 注意： 在文档中提出要添加模块标识符才能达到修改本地文件，只变化main文件名，不变化其他打包文件的目的，但在我的测试下不需要加这个标识符自动有这种效果。

## HMR ([案例8](./demo08))

热模块替换就是值只替换修改的模块，不刷新页面，提高开发效率。

webpack.config.js
```js
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { HotModuleReplacementPlugin } = require('webpack');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: {
    main: './index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash].js',
    publicPath: '/'
  },
  devServer: {
    contentBase: './dist',
    port: 8000,
    // 开启热替换
    hot: true
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'cache',
      template: "index.html"
    }),
    // 开启热替换
    new HotModuleReplacementPlugin()
  ]
};

```

index.js

```js
import _ from 'lodash';
import printMe from './print'

function component() {
  var element = document.createElement('div');
  var btn = document.createElement('button');

  element.innerHTML = _.join(['Hello', 'webpack'], ' ');

  btn.innerHTML = 'Click me and check the console!';
  btn.onclick = printMe;

  element.appendChild(btn);

  return element;
}

document.body.appendChild(component());

if (module.hot) {
  module.hot.accept('./print.js', () => {
    console.log('accept the updated printMe module!');
    printMe();
  })
}

```

当我们更新print.js时，只会更新该模块。

## 懒加载 ([案例9](./demo09))

index.js

````js
import _ from 'lodash';

function component() {
  var element = document.createElement('div');
  var btn = document.createElement('button');

  element.innerHTML = _.join(['Hello', 'webpack'], ' ');

  btn.innerHTML = 'Click me and check the console!';
  btn.onclick = e => import('./print').then(module => {
    const print = module.default();
    print();
  });

  element.appendChild(btn);

  return element;
}

document.body.appendChild(component());

if (module.hot) {
  module.hot.accept('./print.js', () => {
    console.log('accept the updated printMe module!');
    printMe();
  })
}

````
采用import()前：

```js
Built at: 2019-06-18 20:01:48
                       Asset       Size  Chunks             Chunk Names
                  index.html  196 bytes          [emitted]
main.3da867b5364b7a8d8c20.js   2.28 MiB    main  [emitted]  main


```
采用import()后：
```js
Built at: 2019-06-18 20:06:49
                       Asset       Size  Chunks             Chunk Names
   0.fc6d77991376136f948f.js  940 bytes       0  [emitted]
                  index.html  196 bytes          [emitted]
main.fc6d77991376136f948f.js   2.29 MiB    main  [emitted]  main

```
利用懒加载，webpack会将该模块单独生成一个文件，当我们点击按钮时，浏览器才会加载该模块文件，这样减小了页面初始化时间。

## shim 预制依赖 ([案例10](./demo10))

### 设置全局全量

象jQuery这种第三方库需要引用第三方库，我们可以设置全局变量。

```js
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ProvidePlugin } = require('webpack');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: {
    main: './index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash].js',
    publicPath: '/'
  },
  devServer: {
    contentBase: './dist',
    port: 8000
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'cache',
      template: "index.html"
    }),
    new ProvidePlugin({
      _: 'lodash'
    })
  ]
};

```

这样我们可以在任何地方使用 `_` 方法。 我们还可以通过配置 `数组路径`来暴露某个模块的单个导出： `FunctionName: [module, child]`

```js
   new ProvidePlugin({
      _: 'lodash',
      lodash: ['lodash', 'join']
   })
```

在这个例子中我们可以全局调用`lodash`(即lodash模块的join方法)方法了。

## tree shaking ([案例11](./demo11))

`optimization.usedExports: true`, 不导出未引用到的代码，在production模式下默认开启，其他模式默认关闭。
