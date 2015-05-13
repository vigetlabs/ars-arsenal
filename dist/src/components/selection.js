exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Selection
 */

var _uiButton = require("./ui/button");

var _uiButton2 = _interopRequireDefault(_uiButton);

var _selectionFigure = require("./selection-figure");

var _selectionFigure2 = _interopRequireDefault(_selectionFigure);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _mixinsRecord = require("../mixins/record");

var _mixinsRecord2 = _interopRequireDefault(_mixinsRecord);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var Selection = _react2["default"].createClass({
  displayName: "Selection",

  mixins: [_mixinsRecord2["default"]],

  getPhoto: function getPhoto() {
    var item = this.state.item;

    return item ? _react2["default"].createElement(_selectionFigure2["default"], { ref: "photo", item: item }) : null;
  },

  render: function render() {
    var className = (0, _classnames2["default"])("ars-selection", {
      "ars-is-loading": this.state.fetching,
      "ars-has-photo": this.state.item
    });

    return _react2["default"].createElement(
      "div",
      { className: className },
      _react2["default"].createElement(
        "div",
        { className: "ars-selection-inner" },
        this.getPhoto(),
        _react2["default"].createElement(
          _uiButton2["default"],
          { ref: "button", onClick: this._onClick, className: "ars-selection-edit" },
          this.state.item ? "Pick a different photo" : "Pick a photo"
        )
      )
    );
  },

  _onClick: function _onClick(e) {
    e.preventDefault();
    this.props.onClick(e);
  }

});

exports["default"] = Selection;
module.exports = exports["default"];