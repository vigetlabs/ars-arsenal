/**
 * Jest configuration
 * https://facebook.github.io/jest/docs/en/configuration.html
 */

module.exports = {
  setupFiles: ['./test/setup.js'],
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  transform: {
    '^.+\\.(ts|tsx)$': 'babel-jest',
    '^.+\\.(js|jsx)$': 'babel-jest'
  }
}
