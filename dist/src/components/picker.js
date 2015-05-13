exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * Picker
 * The a modal that appears to select a gallery image
 */

var _uiButton = require('./ui/button');

var _uiButton2 = _interopRequireDefault(_uiButton);

var _mixinsCollection = require('../mixins/collection');

var _mixinsCollection2 = _interopRequireDefault(_mixinsCollection);

var _error = require('./error');

var _error2 = _interopRequireDefault(_error);

var _reactFocusTrap = require('react-focus-trap');

var _reactFocusTrap2 = _interopRequireDefault(_reactFocusTrap);

var _gallery = require('./gallery');

var _gallery2 = _interopRequireDefault(_gallery);

var _reactLibReactComponentWithPureRenderMixin = require('react/lib/ReactComponentWithPureRenderMixin');

var _reactLibReactComponentWithPureRenderMixin2 = _interopRequireDefault(_reactLibReactComponentWithPureRenderMixin);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _search = require('./search');

var _search2 = _interopRequireDefault(_search);

var Picker = _react2['default'].createClass({
  displayName: 'Picker',

  mixins: [_mixinsCollection2['default'], _reactLibReactComponentWithPureRenderMixin2['default']],

  propTypes: {
    onChange: _react2['default'].PropTypes.func.isRequired,
    onExit: _react2['default'].PropTypes.func.isRequired
  },

  getDefaultProps: function getDefaultProps() {
    return {
      items: [],
      picked: false
    };
  },

  getInitialState: function getInitialState() {
    return {
      picked: this.props.picked
    };
  },

  confirm: function confirm() {
    this.props.onChange(this.state.picked);
    this.props.onExit();
  },

  render: function render() {
    var _state = this.state;
    var error = _state.error;
    var items = _state.items;
    var search = _state.search;

    return _react2['default'].createElement(
      _reactFocusTrap2['default'],
      { onExit: this.props.onExit },
      _react2['default'].createElement(
        'header',
        { className: 'ars-dialog-header' },
        _react2['default'].createElement(_search2['default'], { key: 'search', ref: 'search', datalist: items, onChange: this._onSearchChange })
      ),
      _react2['default'].createElement(_error2['default'], { error: error }),
      _react2['default'].createElement(_gallery2['default'], { ref: 'gallery', search: search, items: items, picked: this.state.picked, onPicked: this._onPicked, onKeyDown: this._onKeyDown }),
      _react2['default'].createElement(
        'footer',
        { className: 'ars-dialog-footer' },
        _react2['default'].createElement(
          _uiButton2['default'],
          { ref: 'cancel', onClick: this.props.onExit },
          'Cancel'
        ),
        _react2['default'].createElement(
          _uiButton2['default'],
          { ref: 'confirm', onClick: this._onConfirm, raised: true },
          'Okay'
        )
      )
    );
  },

  _onSearchChange: function _onSearchChange(search) {
    this.setState({ search: search }, this.fetch);
  },

  _onPicked: function _onPicked(picked) {
    this.setState({ picked: picked });
  },

  _onConfirm: function _onConfirm(e) {
    e.preventDefault();
    this.confirm();
  },

  _onKeyDown: function _onKeyDown(_ref) {
    var key = _ref.key;
    var metaKey = _ref.metaKey;
    var ctrlKey = _ref.ctrlKey;

    var properMod = metaKey || ctrlKey;

    switch (key) {
      case 'Enter':
        if (properMod) this.confirm();
        break;
    }
  }

});

exports['default'] = Picker;
module.exports = exports['default'];