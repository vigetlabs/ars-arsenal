var Server  = require("webpack-dev-server")
var Webpack = require("webpack")
var config  = require('../webpack.config')

config.devtool = 'inline-source-map'

config.entry = [
  "webpack-dev-server/client?http://localhost:8080",
  'webpack/hot/dev-server',
  './example/example.jsx'
]

config.plugins = [
  new Webpack.HotModuleReplacementPlugin(),
  new Webpack.NoErrorsPlugin()
]

config.output = {
  filename: 'example.build.js',
  path: __dirname,
  publicPath: '/'
}

config.resolve.extensions = [ '', '.js', '.jsx', '.scss', '.css']

config.module.loaders.unshift(
  {
    test    : /\.jsx*$/,
    exclude : /node_modules/,
    loader  : 'react-hot'
  },
  {
    test    : /\.s*(c|a)ss$/,
    exclude : /node_modules/,
    loader  : 'style!css!autoprefixer!sass'
  }
)

module.exports = new Server(Webpack(config), {
  hot: true,
  contentBase: './example',
  noInfo: true,
  stats: { colors: true },
  historyApiFallback: true
});
