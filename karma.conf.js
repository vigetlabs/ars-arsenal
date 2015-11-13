var Webpack = require('webpack')
var webpack_config = require('./webpack.config')

module.exports = function(config) {
  config.set({

    browsers: [ 'Chrome' ],

    frameworks: [ 'mocha', 'sinon-chai' ],

    logLevel: config.LOG_ERROR,

    files: [
      { pattern: 'test/*.json', watched: false, included: false, served: true },
      { pattern: 'test/*.jpg',  watched: false, included: false, served: true },
      'src/**/__tests__/*.js*'
    ],

    preprocessors: {
      'src/**/__tests__/*.js*': [ 'webpack' ]
    },

    reporters: [ 'mocha', 'coverage' ],

    mochaReporter: {
      output: 'minimal'
    },

    coverageReporter: {
      reporters: [
        { type: 'html', subdir: 'report-html' },
        { type: 'json', subdir: 'report-json' },
        { type: 'lcov', subdir: 'report-lcov' }
      ]
    },

    webpack: {
      devtool : 'inline-source-map',

      plugins: [
        new Webpack.ProvidePlugin({
          React     : 'react',
          TestUtils : 'react-addons-test-utils'
        })
      ],

      resolve: webpack_config.resolve,

      module: {
        loaders: [{
          test    : /\.jsx*$/,
          exclude : /node_modules/,
          loader  : 'babel',
          query   : {
            stage    : 2,
            optional : [ 'runtime']
          }
        }],
        postLoaders: [
          {
            test: /\.jsx*$/,
            exclude: /(__tests__|node_modules)\//,
            loader: 'istanbul-instrumenter'
          }
        ]
      }
    },

    webpackServer: {
      noInfo: true
    }
  });
};
