const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/app/app.tsx',
  output: {
    filename: 'app.js',
  },
  module: {
    rules: [
      { test: /\.ts(x)$/, use: 'ts-loader' },
      {
        test: /\.ts(x)$/,
        enforce: 'pre',
        use: [
          {
            loader: 'tslint-loader',
            options: { }
          }
        ]
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      'src/static/index.html'
    ]),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 8081,
    proxy: {
      '/api': 'http://localhost:8080',
      '/ws': {
        target: 'ws://localhost:8081',
        ws: true
      },
    }
  }
};