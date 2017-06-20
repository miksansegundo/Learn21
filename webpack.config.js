const path = require('path')
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
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: true,
              importLoaders: 1,
              localIdentName: '[name]--[local]--[hash:base64:8]'
            }
          },
          'postcss-loader' // has separate config, see postcss.config.js nearby
        ]
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
  ],
}

module.exports = settings
