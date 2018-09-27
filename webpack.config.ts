const path = require('path');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const globImporter = require('node-sass-glob-importer');
import * as webpackset from './webpackset';

const SRC = './src';

/**
 * dev/prodに共通するconfigをここに書く
 */
const commonConfig = merge([
  {
    context: process.cwd() + '/src',
    entry: {
      'assets/js/app.js': `./assets/js/app.js`,
      'assets/css/app.css': `./assets/css/app.scss`
    },
    output: {
      path: path.resolve(process.cwd(), 'dist'),
      filename: '[name]',
      publicPath: '/',
    },
    module: {
      rules: [
        {
          test: /\.(jpe?g|png|gif|svg)$/,
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]'
          }
        },
        {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
            use: [
              {
                loader: 'css-loader',
                options: {
                  importLoaders: 2,
                }
              },
              'postcss-loader',
              {
                loader: 'sass-loader',
                options: {
                  includePaths: [`${SRC}`],
                  importer: globImporter()
                }
              }
            ]
          })
        }
      ]
    },
    plugins: [
      ...webpackset.ejs(),
      new ExtractTextPlugin('[name]')
    ],
    // キャシュ有効化
    cache: true,
    // 拡張子省略時のpath解決
    resolve: {
      extensions: ['.js', '.json', '*'],
      alias: {
        '@': path.join(process.cwd(), SRC, 'js')
      }
    }
  }
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
  console.log('mode', mode);
  if (mode === 'production') {
    return merge(commonConfig, productionConfig, { mode });
  }

  return merge(commonConfig, developmentConfig, { mode });
};
