const webpack = require('webpack')
const WebpackBar = require('webpackbar')
const portfinder = require('portfinder')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 友好输出
const friendlyErrorWebpackPlugin = require('friendly-errors-webpack-plugin')
const path = require('path')
const config = require('../config')

const webpackConfig = {
  mode: 'development',
  entry: {
    app: './src/layout/main.js',
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': path.resolve('src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/layout/index.html',
      inject: true,
    }),
    new WebpackBar()
  ],
  devServer: {
    contentBase: false, // 使用当前目录提供内容
    compress: true,
    host: process.env.HOST || config.dev.host,
    port: process.env.PORT || config.dev.port,
    hot: true,
    quiet: true,
  },
}

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      process.env.HOST = port
      webpackConfig.devServer.port = port
      webpackConfig.plugins.push(
        new friendlyErrorWebpackPlugin({
          compilationSuccessInfo: {
            messages: [
              `Application is running here http://${webpackConfig.devServer.host}:${port}`,
            ],
          },
        })
      )
      resolve(webpackConfig)
    }
  })
})
