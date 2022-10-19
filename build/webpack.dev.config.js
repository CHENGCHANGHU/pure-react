const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const getWebpackBaseConfig = require('./webpack.base.config');

const webpackDevConfig = commandParams => {
  // console.log('[commandParams]', commandParams);
  return merge(getWebpackBaseConfig(productionFlag = false, false), {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    devServer: {
      hot: true,
      port: 8231,
      // open: true,
      // static: path.join(__dirname, '..', 'dist'),
      compress: true,
      historyApiFallback: true,
    }
  });
};

module.exports = webpackDevConfig;