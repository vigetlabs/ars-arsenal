var example = Object.create(require('./webpack.config'))

example.devtool = 'inline-source-map'

example.entry = {
  'example.build' : './example/example.jsx'
}

example.externals = {}

example.output = {
  filename: '[name].js',
  path: './example',
  publicPath: '/',
  devtoolModuleFilenameTemplate: '[resource-path]'
}

module.exports = example
