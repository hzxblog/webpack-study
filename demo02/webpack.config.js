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
