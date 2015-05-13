exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Sync Mixin
 * Encapsulates data operations required for retrieving photos
 */

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _xhr = require("xhr");

var _xhr2 = _interopRequireDefault(_xhr);

var Types = _react2["default"].PropTypes;

var Sync = {

  propTypes: {
    makeQuery: Types.func,
    makeURL: Types.func,
    onError: Types.func,
    onFetch: Types.func,
    url: Types.string.isRequired
  },

  getDefaultProps: function getDefaultProps() {
    return {
      makeQuery: function makeQuery(query) {
        return "q=" + query;
      },
      makeURL: function makeURL(url) {
        var id = arguments[1] === undefined ? false : arguments[1];
        return url + (id ? "/" + id : "");
      },
      onError: function onError(response) {
        return response;
      },
      onFetch: function onFetch(data) {
        return data;
      }
    };
  },

  getInitialState: function getInitialState() {
    return {
      error: false,
      search: ""
    };
  },

  syncProps: function syncProps() {
    var _props = this.props;
    var makeURL = _props.makeURL;
    var makeQuery = _props.makeQuery;
    var onError = _props.onError;
    var onFetch = _props.onFetch;
    var url = _props.url;

    return { makeURL: makeURL, makeQuery: makeQuery, onError: onError, onFetch: onFetch, url: url };
  },

  request: function request(url, success, error) {
    return (0, _xhr2["default"])({ url: url, json: true }, function (err, response, body) {
      err ? error(body, err) : success(body);
    });
  },

  fetch: function fetch(slug) {
    var url = this.props.makeURL(this.props.url, slug);

    if (this.state.request) {
      this.state.request.abort();
    }

    if (this.state.search) {
      url = url + "?" + this.props.makeQuery(this.state.search);
    }

    this.setState({
      request: Sync.request(url, this.responseDidSucceed, this.responseDidFail)
    });
  }

};

exports["default"] = Sync;
module.exports = exports["default"];