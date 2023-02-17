const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

/**
 * 获取webpack基础配置
 * @param {*} productionFlag 是否为生产环境
 * @returns 
 */
function getWebpackBaseConfig (productionFlag = false) {
  return {
    entry: {
      index: path.join(__dirname, '..', 'src', 'index.js'),
    },
    output: {
      path: path.resolve(__dirname, '..', 'dist'),
      filename: 'js/[name].[contenthash].js',
      chunkFilename: 'js/[name].[contenthash].chunk.js',
      publicPath: productionFlag ? 'https://tigercheng.gitee.io/react/' : '/',
    },
    module: {
      rules: [
        {
          test: /\.js|jsx$/,
          loader: 'babel-loader',
          exclude: path.resolve(__dirname, '..', 'node_modules'),
        },
        {
          test: /\.tsx?$/,
          use: [
            { loader: 'babel-loader', },
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: true,
              },
            },
          ],
        },
        {
          test: /\.css$/,
          use: [
            productionFlag ? MiniCssExtractPlugin.loader : 'style-loader',
            // MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                esModule: false
              }
            },
            'postcss-loader',
          ]
        },
        {
          test: /\.scss$/,
          use: [
            productionFlag ? MiniCssExtractPlugin.loader : 'style-loader',
            // MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                esModule: false
              }
            },
            'postcss-loader',
            'sass-loader',
          ]
        },
        {
          test: /\.(png|jpe?g|gif)(\?.*)?$/,
          type: 'asset',
          generator: {
            filename: 'assets/images/[name].[contenthash:8][ext]'
          },
          parser: {
            dataUrlCondition: {
              maxSize: 1 * 1024
            }
          }
        },
      ],
    },
    resolve: {
      extensions: ['.js', '.ts', '.json', '.md'],
      alias: {
        'public': path.join(__dirname, '..', 'public'),
        '@': path.resolve(__dirname, '..', 'src'),
        'src': path.join(__dirname, '..', 'src'),
        'utils': path.join(__dirname, '..', 'src', 'utils'),
        'pages': path.join(__dirname, '..', 'src', 'pages'),
        'hooks': path.join(__dirname, '..', 'src', 'hooks'),
        'store': path.join(__dirname, '..', 'src', 'store'),
      }
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.join(__dirname, '..', 'src', 'index.html'),
        favicon: path.join(__dirname, '..', 'public', 'icon.png'),
        inject: true,
        chunks: ['index'],
      }),
      new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash].css',
      }),
    ],
  };
}

module.exports = getWebpackBaseConfig;