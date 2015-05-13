exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Ars
 * The main element for Ars Arsenal
 */

var _picker = require("./picker");

var _picker2 = _interopRequireDefault(_picker);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _selection = require("./selection");

var _selection2 = _interopRequireDefault(_selection);

var _mixinsSync = require("../mixins/sync");

var _mixinsSync2 = _interopRequireDefault(_mixinsSync);

var Types = _react2["default"].PropTypes;

var Ars = _react2["default"].createClass({
  displayName: "Ars",

  mixins: [_mixinsSync2["default"]],

  propTypes: {
    onChange: Types.func
  },

  getDefaultProps: function getDefaultProps() {
    return {
      onChange: function onChange() {},
      picked: null
    };
  },

  getInitialState: function getInitialState() {
    return {
      dialogOpen: false,
      picked: this.props.picked
    };
  },

  getPicker: function getPicker() {
    var picked = this.state.picked;

    return _react2["default"].createElement(_picker2["default"], _extends({ key: "dialog", ref: "picker" }, this.syncProps(), { onChange: this._onGalleryPicked, onExit: this._onExit, picked: picked }));
  },

  render: function render() {
    var _state = this.state;
    var dialogOpen = _state.dialogOpen;
    var picked = _state.picked;

    return _react2["default"].createElement(
      "div",
      { className: "ars" },
      _react2["default"].createElement(_selection2["default"], _extends({ ref: "selection" }, this.syncProps(), { onClick: this._onOpenClick, slug: picked })),
      dialogOpen && this.getPicker()
    );
  },

  _triggerChange: function _triggerChange() {
    this.props.onChange(this.state.picked);
  },

  _onOpenClick: function _onOpenClick() {
    this.setState({ dialogOpen: true });
  },

  _onGalleryPicked: function _onGalleryPicked(picked) {
    this.setState({ picked: picked }, this._triggerChange);
  },

  _onExit: function _onExit() {
    this.setState({ dialogOpen: false });
  }

});

exports["default"] = Ars;
module.exports = exports["default"];