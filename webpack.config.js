const webpack = require('webpack');

module.exports = {
  entry: {
    app: './js/source/app.js',
    vendor: ['react', 'react-dom', 'whatwg-fetch'],
  },
  output: {
    path:'C:\\Users\\Chris\\Documents\\WebDev\\Voterific\\static',
    //path: path.resolve(__dirname, 'static'),
    filename: 'app.bundle.js'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({name:'vendor', filename:'vendor.bundle.js'})
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
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      },
    ]
  }
};