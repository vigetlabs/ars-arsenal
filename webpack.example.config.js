var Webpack           = require('webpack')
var ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = {
  debug   : true,
  devtool : 'source-map',

  entry: {
    'example/example.build' : './example/example.js'
  },

  output: {
    path: '.',
    filename: '[name].js',
    publicPath: '/'
  },

  resolve: {
    extensions: ['', '.js', '.jsx', '.json', '.scss'],
    modulesDirectories: [ 'web_modules', 'node_modules', 'src']
  },

  plugins: [
    new ExtractTextPlugin("build/css/ars-arsenal.css"),
    new Webpack.DefinePlugin({
      '__DEV__' : process.env.NODE_ENV !== 'production'
    })
  ],

  module: {
    loaders: [
      {
        test    : /\.s(c|a)ss$/,
        loader  : ExtractTextPlugin.extract('style-loader', 'css-loader!autoprefixer-loader!sass-loader')
      },
      {
        test    : /\.jsx*$/,
        loader  : 'envify-loader'
      },
      {
        test    : /\.json$/,
        loader  : 'json-loader'
      },
      {
        test    : /\.jsx*$/,
        exclude : /node_modules/,
        loader  : '6to5-loader?experimental=true&runtime=true',
        options : {
          experimental : true,
          runtime      : true,
          modules      : 'common'
        }
      }
    ]
  }
}
