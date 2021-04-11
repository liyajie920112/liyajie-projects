const WebpackBar = require('webpackbar')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')
const argObj = require('./utils').formatArguments()
const devMode = argObj.mode !== 'production'

const webpackCommonConfig = {
  entry: {
    app: './packages/layout/index.js',
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[chunkhash:8].js',
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
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(sa|sc)ss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: require('dart-sass'),
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './packages/layout/src/index.html',
      inject: true,
    }),
    new WebpackBar(),
  ],
}

const prodPlugins = [
  new MiniCssExtractPlugin({
    filename: 'css/[contenthash:8].css',
    chunkFilename: 'css/[contenthash:8].css',
  }),
]
if (!devMode) {
  // webpackCommonConfig.optimization.chunkIds = 'natural'
  webpackCommonConfig.plugins.push(...prodPlugins)
}

module.exports = webpackCommonConfig
