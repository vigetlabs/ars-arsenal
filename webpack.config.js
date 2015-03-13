var Webpack           = require('webpack')
var ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = {
  entry: {
    'build/js/ars-arsenal' : './src/index.jsx'
  },

  output: {
    filename: '[name].js',
    libraryTarget: 'commonjs2',
    path: '.',
    devtoolModuleFilenameTemplate: '[resource-path]'
  },

  externals: {
    'react': 'react',
    'react/lib/ReactCSSTransitionGroup' : 'react/lib/ReactCSSTransitionGroup',
    'react/lib/ReactComponentWithPureRenderMixin' : 'react/lib/ReactComponentWithPureRenderMixin'
  },

  resolve: {
    extensions: ['', '.js', '.jsx', '.json', '.scss', '.css'],
    modulesDirectories: [ 'web_modules', 'node_modules', 'src']
  },

  plugins: [
    new ExtractTextPlugin("build/css/ars-arsenal.css", {
      disable: process.env.NODE_ENV !== 'production'
    })
  ],

  module: {
    loaders: [
      {
        test    : /\.s*(c|a)ss$/,
        loader  : ExtractTextPlugin.extract('style', 'css!autoprefixer!sass')
      },
      {
        test    : /\.jsx*$/,
        exclude : /node_modules/,
        loader  : 'babel?experimental'
      },
      {
        test    : /\.json$/,
        loader  : 'json'
      }
    ]
  }
}
