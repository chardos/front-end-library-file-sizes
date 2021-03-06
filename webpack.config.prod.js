"use strict";
var webpack = require('webpack');
var path = require('path');
var loaders = require('./webpack.loaders');
// var ExtractTextPlugin = require('extract-text-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const HOST = process.env.HOST || "127.0.0.1";
const PORT = process.env.PORT || "8888";

module.exports = {
  entry: [
    './src/index.js', // your app's entry point
  ],
  devtool: process.env.WEBPACK_DEVTOOL || 'eval-source-map',
  output: {
    publicPath: '/',
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    modules: [
        path.resolve(__dirname, 'node_modules'),
        path.resolve('./src')
    ]
  },
  module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            presets: [
              [ 'es2015', { modules: false } ],
              "react",
              "stage-1"
            ]
          }
        },
        {
          test: /\.(css|scss)$/,
          exclude: /node_modules/,
          use: [{
              loader: "style-loader" // creates style nodes from JS strings
          }, {
              loader: "css-loader" // translates CSS into CommonJS
          }, {
              loader: "sass-loader" // compiles Sass to CSS
          }, {
              loader: "postcss-loader"
          }]
        }
      ],
  },
  devServer: {
    contentBase: "./public",
    // do not print bundle build stats
    noInfo: true,
    // enable HMR
    hot: true,
    // embed the webpack-dev-server runtime into the bundle
    inline: true,
    // serve index.html in place of 404 responses to allow HTML5 history
    historyApiFallback: true,
    port: PORT,
    host: HOST
  },
  plugins: [
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"production"',
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false,
            screw_ie8: true,
        },
    }),
    new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: true,
    }),
    new webpack.optimize.OccurrenceOrderPlugin(true),
    // new ExtractTextPlugin({
    //   filename: 'style.css',
    //   allChunks: true
    // }),
    new webpack.NamedModulesPlugin(),
    new BundleAnalyzerPlugin() // Turn this on when you want to analyze file size
  ]
};
