const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')

const settings = {
  entry: {
    bundle: [
      'react-hot-loader/patch',
      './src/index.tsx'
    ]
  },
  output: {
    filename: '[name].js',
    publicPath: '/',
    path: path.resolve('public')
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: ['ts-loader']
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                sourceMap: true,
                importLoaders: 1,
                localIdentName: '[name]--[local]--[hash:base64:8]'
              }
            },
            {
              loader: 'postcss-loader'
            }
          ]
        })
      },
      { test: /\.png$/, loader: 'url-loader?limit=100000' },
      // jpg files are never inlined
      { test: /\.(jpe?g|bmp)$/, loader: 'file-loader' },
      // convert svg files to react components
    ]
  },
  devServer: {
    contentBase: path.resolve('src/www'),
    // full URL is necessary for Hot Module Replacement if additional path will be added.
    publicPath: 'http://localhost:8080/',
    quiet: false,
    hot: true,
    historyApiFallback: true,
    inline: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.LoaderOptionsPlugin({
      debug: true
    }),
    new ExtractTextPlugin('modules.css')
  ],
}

module.exports = settings
