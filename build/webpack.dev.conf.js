const portfinder = require('portfinder')
// 友好输出
const friendlyErrorWebpackPlugin = require('friendly-errors-webpack-plugin')
const config = require('../config')
const { merge } = require('webpack-merge')
const webpackCommonConfig = require('./webpack.common')

const webpackConfig = merge(webpackCommonConfig, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    contentBase: false, // 使用当前目录提供内容
    compress: true,
    host: process.env.HOST || config.dev.host,
    port: process.env.PORT || config.dev.port,
    hot: true,
    quiet: true,
    overlay: true,
  },
})

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
