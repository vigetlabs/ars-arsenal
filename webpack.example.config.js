var Webpack           = require('webpack')
var ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = {
  debug   : true,
  devtool : 'inline-source-map',

  entry: {
    'example.build' : './example/example.jsx'
  },

  output: {
    filename: '[name].js',
    path: './example',
    publicPath: '/',
    devtoolModuleFilenameTemplate: '[resource-path]'
  },

  resolve: {
    extensions: ['', '.js', '.jsx', '.json', '.scss', '.css'],
    modulesDirectories: [ 'web_modules', 'node_modules', 'src']
  },

  plugins: [
    new ExtractTextPlugin("example.build.css"),
    new Webpack.ProvidePlugin({
      to5Runtime: "imports?global=>{}!exports?global.to5Runtime!6to5/runtime"
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
        loader  : '6to5?experimental&runtime&modules=common',
      },
      {
        test    : /\.json$/,
        loader  : 'json'
      }
    ]
  }
}
