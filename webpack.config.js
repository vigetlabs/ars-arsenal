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
    'react/addons': 'react/addons'
  },

  resolve: {
    extensions: ['', '.js', '.jsx', '.json', '.scss', '.css'],
    modulesDirectories: [ 'web_modules', 'node_modules', 'src']
  },

  plugins: [
    new ExtractTextPlugin("build/css/ars-arsenal.css"),
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
