exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * Figure
 * An individual gallery tile
 */

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _uiImage = require('./ui/image');

var _uiImage2 = _interopRequireDefault(_uiImage);

var _reactInk = require('react-ink');

var _reactInk2 = _interopRequireDefault(_reactInk);

var cx = require('classnames');

var Figure = _react2['default'].createClass({
  displayName: 'Figure',

  propTypes: {
    record: _react2['default'].PropTypes.object.isRequired,
    onClick: _react2['default'].PropTypes.func.isRequired,
    picked: _react2['default'].PropTypes.bool
  },

  render: function render() {
    var _props = this.props;
    var record = _props.record;
    var picked = _props.picked;

    var className = cx({
      'ars-fig': true,
      'ars-fig-picked': picked
    });

    return _react2['default'].createElement(
      'button',
      { className: className, onClick: this._onClick },
      _react2['default'].createElement(_uiImage2['default'], { className: 'ars-fig-img', src: record.url }),
      _react2['default'].createElement(
        'span',
        { className: 'ars-fig-caption' },
        record.name
      ),
      _react2['default'].createElement(_reactInk2['default'], { opacity: 0.4 })
    );
  },

  _onClick: function _onClick(e) {
    e.preventDefault();
    this.props.onClick(this.props.record.id);
  }

});

exports['default'] = Figure;
module.exports = exports['default'];