

const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require("html-webpack-plugin");
import * as webpackset from './webpackset';

/**
 * dev/prodに共通するconfigをここに書く
 */
const commonConfig = merge([
  {
    plugins: [
      new HtmlWebpackPlugin({
        title: "Webpack demo",
      }),
    ],
  },
]);

/**
 * prodctionのconfigをここに書く
 */
const productionConfig = merge([]);

/**
 * developmentのconfigをここに書く
 */
const developmentConfig = merge([
  webpackset.devServer({
    host: process.env.HOST,
    port: process.env.PORT
  })
]);

module.exports = mode => {
  if (mode === "production") {
    return merge(commonConfig, productionConfig, { mode });
  }

  return merge(commonConfig, developmentConfig, { mode });
};

