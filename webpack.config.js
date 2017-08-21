export default {
  resolve: {
    extensions: ['', '.js', '.js'],
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
