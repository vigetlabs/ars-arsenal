var Server  = require("webpack-dev-server")
var Webpack = require("webpack")
var config  = require('../webpack.config')

config.devtool = 'inline-source-map'

config.entry = [
  './example/example.jsx'
]

config.output = {
  filename: 'example.build.js',
  path: __dirname,
  publicPath: '/'
}

config.resolve.extensions = [ '', '.js', '.jsx', '.scss', '.css']

config.module.loaders.unshift({
  test    : /\.s*(c|a)ss$/,
  exclude : /node_modules/,
  loader  : 'style!css!autoprefixer!sass'
})

module.exports = new Server(Webpack(config), {
  contentBase: './example',
  noInfo: true,
  stats: { colors: true },
  historyApiFallback: true
});
