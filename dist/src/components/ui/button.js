exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

/**
 * Button
 */

var _reactInk = require('react-ink');

var _reactInk2 = _interopRequireDefault(_reactInk);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var Button = _react2['default'].createClass({
  displayName: 'Button',

  getDefaultProps: function getDefaultProps() {
    return {
      raised: false,
      type: 'button'
    };
  },

  getClassName: function getClassName(base) {
    var mods = (0, _classnames2['default'])({
      'ars-button': true,
      'ars-button-raised': this.props.raised
    });

    return (0, _classnames2['default'])(base, mods);
  },

  render: function render() {
    var _props = this.props;
    var className = _props.className;
    var children = _props.children;

    var attrs = _objectWithoutProperties(_props, ['className', 'children']);

    return _react2['default'].createElement(
      'button',
      _extends({ className: this.getClassName(className) }, attrs),
      children,
      _react2['default'].createElement(_reactInk2['default'], null)
    );
  }

});

exports['default'] = Button;
module.exports = exports['default'];