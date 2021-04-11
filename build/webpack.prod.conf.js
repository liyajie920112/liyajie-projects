const WebpackBar = require('webpackbar')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')
const hash = require('hash-sum')

const webpackProdConfig = {
  entry: {
    app: './packages/layout/index.js',
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/[name].js',
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
              preserveWhitespace: false
            }
          },
        ]
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
      filename: 'css/[name].css',
      // chunkFilename: 'css/[contenthash:8].css',
    }),
  ],
  optimization: {
    minimize: true,
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          enforce: true,
          // chunks: 'initial',
          name(module, chunks, cacheGroupKey) {
            console.log('module:' + hash(module.identifier()));

            const moduleFileName = module
              .identifier()
              .split('/')
              .reduceRight((item) => item);
            const allChunksNames = chunks.map((item) => item.name).join('~');
            return `${cacheGroupKey}-${allChunksNames}-${moduleFileName}`;
          },
        },
        main: {
          test: /src/,
          enforce: true,
          // chunks: 'initial',
          name(module, chunks, cacheGroupKey) {
            console.log('module----:' + hash(module.identifier()));
            const n = hash(module.identifier())
            const moduleFileName = module
            .identifier()
            .split('/')
            .reduceRight((item) => item);
            const allChunksNames = chunks.map((item) => item.name).join('~');
            return n // cacheGroupKey + "-" + moduleFileName;
          }
        }
      }
    },
    chunkIds: 'named',
    runtimeChunk: {
      name: 'runtime'
    }
  }
}

module.exports = webpackProdConfig
