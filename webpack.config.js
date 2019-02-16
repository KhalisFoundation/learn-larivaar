const cssnano = require('cssnano');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const preset = require('postcss-preset-env');

const isDev = process.env.NODE_ENV === 'development';

const APP_DIR = path.join(__dirname, 'src');
const BUILD_DIR = path.join(__dirname, 'www');

module.exports = {
  mode: process.env.NODE_ENV || 'production',
  entry: `${APP_DIR}/index.js`,
  output: {
    path: BUILD_DIR,
    filename: '[name].[hash].js',
  },
  devtool: isDev ? 'source-map' : false,
  module: {
    rules: [
      {
        test: /\.jsx?/,
        include: APP_DIR,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              localIdentName: '[local]--[hash:base64:5]',
              modules: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                preset({ stage: 0 }),
                cssnano(),
              ],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
    }),
    new HtmlWebpackPlugin({
      template: `${APP_DIR}/index.html`,
    }),
  ],
  devServer: {
    contentBase: BUILD_DIR,
    compress: true,
    historyApiFallback: true,
  },
};
