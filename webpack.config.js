const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/'
  },
  mode: 'development',
  devtool: 'inline-source-map',
  resolve: {
    alias: {
      '@usig-gcba/mapa-interactivo': path.resolve(__dirname, 'node_modules/@usig-gcba/mapa-interactivo'),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 9000,
    hot: true,
    open: false,
    proxy: [
      {
        context: () => true,
        target: 'http://localhost/usig-mapa-interactivo',
        changeOrigin: true,
        secure: false
      }
    ]
  },
};
