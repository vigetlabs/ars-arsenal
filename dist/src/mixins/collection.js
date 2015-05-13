exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * Collection Mixin
 * Sync operations for a list of items
 */

var _sync = require('./sync');

var _sync2 = _interopRequireDefault(_sync);

var _reactLibInvariant = require('react/lib/invariant');

var _reactLibInvariant2 = _interopRequireDefault(_reactLibInvariant);

exports['default'] = {

  mixins: [_sync2['default']],

  getInitialState: function getInitialState() {
    items: [];
  },

  componentDidMount: function componentDidMount() {
    this.fetch();
  },

  componentWillMount: function componentWillMount() {
    (0, _reactLibInvariant2['default'])(this.responseDidSucceed, 'Component requires a responseDidSucceed method');
    (0, _reactLibInvariant2['default'])(this.responseDidFail, 'Component requires a responseDidFail method');
  },

  responseDidSucceed: function responseDidSucceed(response) {
    var items = this.props.onFetch(response);

    this.setState({ items: items, error: false });
  },

  responseDidFail: function responseDidFail(response) {
    var error = this.props.onError(response);

    this.setState({ error: error });
  }

};
module.exports = exports['default'];