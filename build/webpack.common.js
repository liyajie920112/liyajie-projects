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
        test: /\.(sa|sc|c)ss$/,
        use: [
          devMode
            ? 'vue-style-loader'
            : {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  esModule: false
                },
              },
          'css-loader',
          'postcss-loader',
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
  optimization: {
    chunkIds: 'named',
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: 'initial',
          minChunks: 2,
          maxInitialRequests: 5, // The default limit is too small to showcase the effect
          minSize: 0, // This is example is too small to create commons chunks
        },
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
        },
        vendor: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendor',
          priority: 10,
          enforce: true,
        },
      },
    },
  },
}

const prodPlugins = [
  new MiniCssExtractPlugin({
    filename: 'css/[contenthash:8].css',
    chunkFilename: 'css/[contenthash:8].css'
  })
]
if (!devMode) {
  webpackCommonConfig.optimization.chunkIds = 'natural'
  webpackCommonConfig.plugins.push(...prodPlugins)
}

module.exports = webpackCommonConfig
