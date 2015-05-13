function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * Datalist
 */

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var Types = _react2['default'].PropTypes;

var DataList = _react2['default'].createClass({
  displayName: 'DataList',

  propTypes: {
    id: Types.string.isRequired,
    items: Types.array
  },

  getDefaultProps: function getDefaultProps() {
    return {
      items: []
    };
  },

  getOption: function getOption(record) {
    return _react2['default'].createElement(
      'option',
      { key: record.id },
      record.caption
    );
  },

  render: function render() {
    var _props = this.props;
    var items = _props.items;
    var id = _props.id;

    return _react2['default'].createElement(
      'datalist',
      { id: id },
      items.map(this.getOption)
    );
  }

});

module.exports = DataList;