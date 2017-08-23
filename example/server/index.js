const Server = require('webpack-dev-server')
const Path = require('path')
const webpack = require('webpack')
const config = require('../webpack.config')
const api = require('./api')

let compiler = webpack(config)

let server = new Server(compiler, {
  contentBase: Path.resolve(__dirname, '..', 'public'),
  hotOnly: process.env.NODE_ENV !== 'production',
  setup(app) {
    app.use('/api', api)
  }
}).listen(process.env.PORT || 8080)
