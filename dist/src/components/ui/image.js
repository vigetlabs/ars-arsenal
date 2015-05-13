exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

/**
 * Image
 * A wrapper around image elements to handle loading states
 * and transitions
 */

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var Image = _react2['default'].createClass({
  displayName: 'Image',

  propTypes: {
    src: _react2['default'].PropTypes.string
  },

  getDefaultProps: function getDefaultProps() {
    return {
      className: ''
    };
  },

  getInitialState: function getInitialState() {
    return {
      didFail: false,
      isLoaded: false
    };
  },

  render: function render() {
    var _cx;

    var _props = this.props;
    var className = _props.className;

    var props = _objectWithoutProperties(_props, ['className']);

    var css = (0, _classnames2['default'])((_cx = {}, _cx['ars-img'] = true, _cx['ars-img-loaded'] = this.state.isLoaded, _cx['ars-img-failed'] = this.state.didFail, _cx[className] = true, _cx));

    return _react2['default'].createElement('img', _extends({ className: css,
      onLoad: this._onLoad,
      onError: this._onError
    }, props));
  },

  _onLoad: function _onLoad() {
    this.setState({ didFail: false, isLoaded: true });
  },

  _onError: function _onError() {
    this.setState({ didFail: true, isLoaded: true });
  }

});

exports['default'] = Image;
module.exports = exports['default'];