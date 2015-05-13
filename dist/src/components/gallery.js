exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * Gallery
 * Displays tiles of photos
 */

var _reactLibReactCSSTransitionGroup = require('react/lib/ReactCSSTransitionGroup');

var _reactLibReactCSSTransitionGroup2 = _interopRequireDefault(_reactLibReactCSSTransitionGroup);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _figure = require('./figure');

var _figure2 = _interopRequireDefault(_figure);

var Gallery = _react2['default'].createClass({
  displayName: 'Gallery',

  propTypes: {
    items: _react2['default'].PropTypes.array,
    onPicked: _react2['default'].PropTypes.func.isRequired
  },

  getDefaultProps: function getDefaultProps() {
    return {
      items: [],
      picked: false,
      search: false
    };
  },

  getItem: function getItem(record) {
    var isPicked = record.id === this.props.picked;

    return _react2['default'].createElement(
      'div',
      { className: 'ars-gallery-item', key: 'photo_' + record.id },
      _react2['default'].createElement(_figure2['default'], { picked: isPicked, record: record, onClick: this.props.onPicked })
    );
  },

  getEmpty: function getEmpty() {
    var search = this.props.search;
    var isEmpty = this.props.items.length <= 0;

    return isEmpty ? _react2['default'].createElement(
      'p',
      { key: '__empty', className: 'ars-empty' },
      'No items exist ',
      search ? 'for “' + search + '”' : ''
    ) : null;
  },

  render: function render() {
    var items = this.props.items;

    return _react2['default'].createElement(
      _reactLibReactCSSTransitionGroup2['default'],
      { component: 'div', className: 'ars-gallery', transitionName: 'ars-fade', onKeyDown: this.props.onKeyDown },
      this.getEmpty(),
      items.map(this.getItem)
    );
  }

});

exports['default'] = Gallery;
module.exports = exports['default'];