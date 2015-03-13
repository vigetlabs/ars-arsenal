var Webpack = require('webpack')
var example = Object.create(require('./webpack.config'))

example.devtool = 'inline-source-map'

example.entry = [
  "webpack-dev-server/client?http://localhost:8080",
  'webpack/hot/dev-server',
  './example/example.jsx'
]

example.externals = {}

example.plugins.push(
  new Webpack.HotModuleReplacementPlugin(),
  new Webpack.NoErrorsPlugin()
)

example.output = {
  filename: 'example.build.js',
  path: './example',
  publicPath: '/',
  devtoolModuleFilenameTemplate: '[resource-path]'
}

example.module.loaders.unshift({
  test    : /\.jsx*$/,
  exclude : /node_modules/,
  loader  : 'react-hot'
})

module.exports = example
