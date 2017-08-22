const Server = require('webpack-dev-server')
const Webpack = require('webpack')
const api = require('./api')

const isProd = process.env.NODE_ENV === 'production'

const config = {
  devtool: 'inline-source-map',

  entry: ['./example/example'],

  output: {
    filename: 'example.build.js',
    path: __dirname,
    publicPath: '/'
  },

  resolve: {
    extensions: ['.js', '.scss', '.css']
  },

  plugins: [
    new Webpack.HotModuleReplacementPlugin(),
    new Webpack.EnvironmentPlugin({
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
          'autoprefixer-loader',
          'sass-loader'
        ]
      }
    ]
  }
}

if (!isProd) {
  config.entry.unshift('react-dev-utils/webpackHotDevClient')
}

module.exports = new Server(Webpack(config), {
  contentBase: './example',
  noInfo: true,
  hotOnly: !isProd,
  setup(app) {
    app.use('/api', api)
  }
})
