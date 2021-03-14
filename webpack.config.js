const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 友好输出
const friendlyErrorWebpackPlugin = require('friendly-errors-webpack-plugin')
const path = require('path')

module.exports = {
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
    new friendlyErrorWebpackPlugin()
  ],
  devServer: {
    contentBase: false, // 使用当前目录提供内容
    compress: true,
    host: '127.0.0.1',
    port: 8989,
    hot: true,
    quiet: true
  }
}
