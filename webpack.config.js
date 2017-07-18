'use strict';

const webpack = require('webpack');

module.exports = {
  entry: {
    app: './js/source/app.js',
    vendor: ['react', 'react-dom', 'whatwg-fetch', 'react-bootstrap', 'babel-polyfill', 'react-router',
             'react-router-bootstrap', 'react-router-dom'],
  },
  output: {
    path:'C:\\Users\\Chris\\Documents\\WebDev\\Voterific\\static',
    //path: path.resolve(__dirname, 'static'),
    filename: 'app.bundle.js'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({name:'vendor', filename:'vendor.bundle.js'}),
  ],
  devServer: {
    port: 8080,
    contentBase: 'static',
    proxy: {
      '/': {
        target: 'http://localhost:3000'
      }
    }
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['react', 'es2015','stage-0']
        }
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: [/\.jsx$/],
        loaders: ['react', 'es2015','jsx-loader?insertPragma=React.DOM&harmony'],
      }
    ]
  },
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx']
  }
};