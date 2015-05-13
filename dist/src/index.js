exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * Ars Arsenal
 * A gallery picker
 */

var _componentsArs = require('./components/ars');

var _componentsArs2 = _interopRequireDefault(_componentsArs);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

exports['default'] = {
  component: _componentsArs2['default'],

  render: function render(el, options) {
    var component = _react2['default'].createElement(_componentsArs2['default'], options);

    _react2['default'].render(component, el);

    return component;
  }
};
module.exports = exports['default'];