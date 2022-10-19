const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const getWebpackBaseConfig = require('./webpack.base.config');

const webpackProdConfig = commandParams => {
  // console.log('[commandParams]', commandParams);
  return merge(getWebpackBaseConfig(productionFlag = true, commandParams.publish), {
    mode: 'production',
    plugins: [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash].css',
      }),
    ],
  });
};

module.exports = webpackProdConfig;