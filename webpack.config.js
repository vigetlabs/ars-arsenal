module.exports = {
  resolve: {
    modulesDirectories: ['web_modules', 'node_modules', 'src']
  },

  module: {
    loaders: [
      {
        test: /\.js*$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
}
