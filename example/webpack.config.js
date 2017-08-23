const webpack = require('webpack')

const isDev = process.env.NODE_ENV !== 'production'

const config = {
  devtool: isDev ? 'inline-source-map' : 'source-map',

  entry: ['./example.js'],

  output: {
    filename: 'example.build.js',
    path: __dirname,
    publicPath: '/'
  },

  resolve: {
    extensions: ['.js', '.scss', '.css'],
    alias: {
      'ars-arsenal': '../src/index.js',
      // Prevents the root React from conflicting with the example React
      react$: require.resolve('react'),
      'react-dom$': require.resolve('react-dom')
    }
  },

  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development'
    })
  ],

  module: {
    loaders: [
      {
        test: /\.js*$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.s*(c|a)ss$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
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
  }
}

if (isDev) {
  config.entry.unshift('react-dev-utils/webpackHotDevClient')
  config.plugins.push(new webpack.HotModuleReplacementPlugin())
}

module.exports = config
