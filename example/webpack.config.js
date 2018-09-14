const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
  context: __dirname,

  entry: ['./example.js'],

  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, 'public'),
    publicPath: '/'
  },

  resolve: {
    extensions: ['.js', '.scss', '.css', '.ts', '.tsx'],
    alias: {
      'ars-arsenal': '../src/index.js'
    }
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/template.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css'
    })
  ],

  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.s*(c|a)ss$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: loader => [
                require('postcss-import')({
                  root: loader.resourcePath
                }),
                require('autoprefixer')()
              ]
            }
          },
          'sass-loader'
        ]
      }
    ]
  },

  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    publicPath: '/',
    port: 3000
  }
}
