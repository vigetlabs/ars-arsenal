function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * Search
 */

var _debounce = require('debounce');

var _debounce2 = _interopRequireDefault(_debounce);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _uiButton = require('./ui/button');

var _uiButton2 = _interopRequireDefault(_uiButton);

var _mixinsUniqueId = require('../mixins/uniqueId');

var _mixinsUniqueId2 = _interopRequireDefault(_mixinsUniqueId);

var _datalist = require('./datalist');

var _datalist2 = _interopRequireDefault(_datalist);

var Types = _react2['default'].PropTypes;

var Search = _react2['default'].createClass({
  displayName: 'Search',

  mixins: [_mixinsUniqueId2['default']],

  statics: {
    // The minimum number of characters before searching
    THRESHOLD: 2,
    // The minimum time between change events
    INTERVAL: 150
  },

  propTypes: {
    onChange: Types.func.isRequired
  },

  getDefaultProps: function getDefaultProps() {
    return {
      datalist: []
    };
  },

  getInitialState: function getInitialState() {
    return {
      search: '',
      debouncedChange: (0, _debounce2['default'])(this.props.onChange, Search.INTERVAL)
    };
  },

  render: function render() {
    var id = 'ars_search_' + this.state.id;
    var list = 'ars_search_list' + this.state.id;

    return _react2['default'].createElement(
      'form',
      { className: 'ars-search', onSubmit: this._onSubmit },
      _react2['default'].createElement(
        'label',
        { className: 'ars-search-label', htmlFor: id },
        'Search'
      ),
      _react2['default'].createElement('input', { id: id, list: list, ref: 'input', type: 'search', className: 'ars-search-input', onChange: this._onChange, placeholder: 'Search', onKeyUp: this._onKeyUp, value: this.state.search }),
      _react2['default'].createElement(_datalist2['default'], { id: list, items: this.props.datalist }),
      _react2['default'].createElement(
        _uiButton2['default'],
        { className: 'ars-hidden' },
        'Submit'
      )
    );
  },

  _updateSearch: function _updateSearch(search) {
    var _this = this;

    var result = search.length >= Search.THRESHOLD ? search : '';

    this.setState({ search: search }, function () {
      return _this.state.debouncedChange(result);
    });
  },

  _onChange: function _onChange() {
    this._updateSearch(this.refs.input.getDOMNode().value || '');
  },

  _onSubmit: function _onSubmit(e) {
    e.preventDefault();
    this._onChange();
  },

  _onKeyUp: function _onKeyUp(_ref) {
    var type = _ref.type;
    var stopPropagation = _ref.stopPropagation;

    if (type === 'Escape') stopPropagation();
  }

});

module.exports = Search;