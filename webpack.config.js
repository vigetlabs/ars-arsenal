module.exports = {

  resolve: {
    extensions: ['', '.js', '.jsx'],
    modulesDirectories: [ 'web_modules', 'node_modules', 'src']
  },

  module: {
    loaders: [{
      test    : /\.jsx*$/,
      exclude : /node_modules/,
      loader  : 'babel'
    }]
  }
}
