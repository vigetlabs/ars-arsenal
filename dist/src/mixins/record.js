exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Record Mixin
 * Sync operations for a single record
 */

var _sync = require("./sync");

var _sync2 = _interopRequireDefault(_sync);

var _reactLibInvariant = require("react/lib/invariant");

var _reactLibInvariant2 = _interopRequireDefault(_reactLibInvariant);

exports["default"] = {

  mixins: [_sync2["default"]],

  getInitialState: function getInitialState() {
    return {
      fetching: false,
      item: false
    };
  },

  fetchIf: function fetchIf(slug) {
    if (slug != undefined) {
      this.setState({ fetching: true });
      this.fetch(slug);
    }
  },

  componentWillMount: function componentWillMount() {
    (0, _reactLibInvariant2["default"])(this.responseDidSucceed, "Component requires a responseDidSucceed method");
    (0, _reactLibInvariant2["default"])(this.responseDidFail, "Component requires a responseDidFail method");

    this.fetchIf(this.props.slug);
  },

  componentWillReceiveProps: function componentWillReceiveProps(props) {
    if (props.slug !== this.props.slug) {
      this.fetchIf(props.slug);
    }
  },

  responseDidSucceed: function responseDidSucceed(response) {
    var item = this.props.onFetch(response);

    this.setState({ item: item, fetching: false, error: false });
  },

  responseDidFail: function responseDidFail(response) {
    var error = this.props.onError(response);

    this.setState({ item: false, fetching: false, error: error });
  }

};
module.exports = exports["default"];