exports.__esModule = true;
/**
 * UniqueID
 * Provides a unique identifier for components
 */

var _id = 0;

exports['default'] = {

  getInitialState: function getInitialState() {
    return {
      id: 'c' + _id++
    };
  }

};
module.exports = exports['default'];