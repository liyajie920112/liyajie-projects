const WebpackBar = require('webpackbar')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')
const hash = require('hash-sum')

function recursiveIssuer(m, c) {
  const issuer = c.moduleGraph.getIssuer(m)
  // For webpack@4 issuer = m.issuer

  if (issuer) {
    return recursiveIssuer(issuer, c)
  }

  const chunks = c.chunkGraph.getModuleChunks(m)
  // For webpack@4 chunks = m._chunks

  for (const chunk of chunks) {
    return chunk.name
  }

  return false
}

const webpackProdConfig = {
  entry: {
    app: './packages/layout/index.js',
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/[name]-[chunkhash:8].js',
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
        use: [
          {
            loader: 'vue-loader',
            options: {
              preserveWhitespace: false,
            },
          },
        ],
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(sa|sc)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: require('dart-sass'),
            },
          },
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
    new MiniCssExtractPlugin({
      filename: 'css/[name]-[contenthash:8].css',
      // chunkFilename: 'css/[name]-[chunkhash:8].css',
    }),
  ],
  optimization: {
    minimize: true,
    splitChunks: {
      chunks: 'all',
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 5,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          enforce: true,
          reuseExistingChunk: true, // 重用已存在的chunk, 默认就是true
          chunks: 'all',
          priority: -10,
          name(module, chunks, cacheGroupKey) {
            return `${cacheGroupKey}`
          },
          filename: (pathData) => {
            return `vendor/${pathData.chunk.name}-${pathData.chunk.hash.slice(
              0,
              9
            )}-bundle.js`
          },
        },
        css: {
          name(module, chunks, cacheGroupKey) {
            return cacheGroupKey
          },
          // type: 'css/mini-extract',
          chunks: 'all',
          enforce: true,
          test: (m, c, entry) => {
            // 提取css
            return m.constructor.name === 'CssModule'
          },
        },
        js: {
          test: (m, c, entry) => {
            // 提取js
            return m.constructor.name === 'NormalModule'
          },
          enforce: true,
          filename: '[name]-[chunkhash:8].js',
          chunks: 'all',
          priority: -20,
          minChunks: 1,
          reuseExistingChunk: true,
          name(module, chunks, cacheGroupKey) {
            const arr = module.identifier().split('/')
            const packagesIndex = arr.findIndex((a) => a === 'packages')
            const n = arr[packagesIndex + 1] || cacheGroupKey
            return `${cacheGroupKey}-${n}`
          },
        },
      },
    },
    chunkIds: 'named',
    mergeDuplicateChunks: true, // 合并重复的模块
    runtimeChunk: {
      name: 'runtime',
    },
  },
}

module.exports = webpackProdConfig
