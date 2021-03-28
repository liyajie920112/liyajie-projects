const webpack = require('webpack')
const rm = require('rimraf')
const ora = require('ora')
const path = require('path')
const chalk = require('chalk')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const { merge } = require('webpack-merge');
const webpackCommonConfig = require('./webpack.common')
const webpackProdConfig = require('./webpack.prod.conf')
const { formatArguments } = require('./utils')
const argObj = formatArguments()

const webpackConfig = merge(webpackCommonConfig, webpackProdConfig)
if (argObj.report) {
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

const spinner = ora('buinding for production... ')
spinner.start()
rm(path.resolve(__dirname, '../dist'), err => {
  if (err) throw err

  webpack(webpackConfig, (err, stats) => {
    spinner.stop()
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')
    if (stats.hasErrors()) {
      console.log(chalk.red('  build failed with errors . \n'))
      process.exit(1)
    }

    console.log(chalk.cyan(' build complete. \n'))
  })
})
