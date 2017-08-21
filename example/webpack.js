const Server = require('webpack-dev-server')
const Webpack = require('webpack')

const config = {
  devtool: 'inline-source-map',

  entry: './example/example',

  output: {
    filename: 'example.build.js',
    path: __dirname,
    publicPath: '/'
  },

  resolve: {
    extensions: ['.js', '.scss', '.css']
  },

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

module.exports = new Server(Webpack(config), {
  contentBase: './example',
  noInfo: true,
  stats: { colors: true },
  historyApiFallback: true
})
