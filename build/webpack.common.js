const WebpackBar = require('webpackbar')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const argObj = require('./utils').formatArguments()
const devMode = argObj.mode !== 'production'

const webpackCommonConfig = {
  entry: {
    app: './packages/layout/index.js',
  },
  target: 'web',
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
        use: ['vue-style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(sa|sc)ss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: require('dart-sass'),
            },
          },
          {
            loader: 'sass-resources-loader',
            options: {
              resources: ['./packages/layout/src/assets/variable.scss']
            }
          }
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              esModule: false,
              publicPath: './',
              name: 'assets/images/[name]-[hash:8].[ext]'
            }
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

module.exports = webpackCommonConfig
