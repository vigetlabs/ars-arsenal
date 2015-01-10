var webpack = require('webpack');
var webpack_config = require('./webpack.config')

module.exports = function(config) {
  config.set({

    browsers: [ process.env.CONTINUOUS_INTEGRATION ? 'Firefox' : 'Chrome' ],

    singleRun: process.env.CONTINUOUS_INTEGRATION === 'true',

    frameworks: [ 'mocha', 'sinon-chai' ],

    files: [
      { pattern: 'test/*.json', watched: false, included: false, served: true },
      { pattern: 'test/*.jpg',  watched: false, included: false, served: true },
      'src/**/__tests__/*.js'
    ],

    preprocessors: {
      'src/**/__tests__/*.js': [ 'webpack' ],
    },

    reporters: [ 'mocha', 'coverage' ],

    webpack: {
      devtool: 'inline-source-map',

      plugins: [
        new webpack.ProvidePlugin({
          to5Runtime: "imports?global=>{}!exports-loader?global.to5Runtime!6to5/runtime"
        })
      ],

      resolve: webpack_config.resolve,

      module: {
        loaders: [
          {
            test    : /\.s(c|a)ss$/,
            loader  : 'style-loader!css-loader!autoprefixer-loader!sass-loader'
          },
          {
            test: /\.json*$/,
            loader: 'json-loader'
          },
          {
            exclude: /(node_modules|bower_components)\//,
            test: /\.jsx*$/,
            loader: '6to5-loader?experimental&runtime&modules=common'
          }
        ],
        postLoaders: [
          {
            test: /\.jsx*$/,
              exclude: /(__tests__|node_modules|bower_components)\//,
              loader: 'istanbul-instrumenter'
          }
        ]
      }
    }
  });
};
