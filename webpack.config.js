var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var config = {
  entry: path.resolve(__dirname, './src/js/main.js'),
  output: {
    path: path.resolve(__dirname, './build'),
    filename: './js/[name].js'
  },
  module: {
    noParse: [],
    loaders: [
    {
      test: /\.js$/, 
      loader: 'babel-loader',
      exclude: /node_modules/,
      query:
      {
        presets:['react']
      }
    },
    {
      test: /\.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query:
      {
        presets:['react']
      }
    },
    {
        test: /\.(css)$/,
        loader: ExtractTextPlugin.extract('style-loader','css-loader')
    },
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      template: __dirname + "/src/index.html"
    }),
    new ExtractTextPlugin("./css/[name].css"),
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress:{
        warnings: false
      }
    })
  ]
};

module.exports = config;