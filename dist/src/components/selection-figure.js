exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Selection Figure
 */

var _uiImage = require("./ui/image");

var _uiImage2 = _interopRequireDefault(_uiImage);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var SelectionFigure = _react2["default"].createClass({
  displayName: "SelectionFigure",

  propTypes: {
    item: _react2["default"].PropTypes.object.isRequired
  },

  render: function render() {
    var _props$item = this.props.item;
    var caption = _props$item.caption;
    var name = _props$item.name;
    var url = _props$item.url;

    return _react2["default"].createElement(
      "figure",
      { className: "ars-selection-figure" },
      _react2["default"].createElement(_uiImage2["default"], { className: "ars-selection-photo", alt: caption, src: url }),
      _react2["default"].createElement(
        "figcaption",
        { className: "ars-selection-desc" },
        _react2["default"].createElement(
          "p",
          { className: "ars-selection-title" },
          name
        ),
        _react2["default"].createElement(
          "p",
          { className: "ars-selection-caption" },
          caption
        )
      )
    );
  }

});

exports["default"] = SelectionFigure;
module.exports = exports["default"];