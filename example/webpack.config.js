const path = require('path')

module.exports = {
  context: __dirname,

  entry: ['./example.js'],

  output: {
    filename: 'example.build.js',
    path: __dirname,
    publicPath: '/'
  },

  resolve: {
    extensions: ['.js', '.scss', '.css'],
    alias: {
      'ars-arsenal': '../src/index.js'
    }
  },

  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.js*$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.s*(c|a)ss$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: loader => [
                require('postcss-import')({
                  root: loader.resourcePath
                }),
                require('autoprefixer')()
              ]
            }
          },
          'sass-loader'
        ]
      }
    ]
  },

  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    publicPath: '/'
  }
}
