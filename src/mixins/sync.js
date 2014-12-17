/**
 * Sync Mixin
 * Encapsulates data operations required for retrieving photos
 */

var Photo = require('../stores/photo')
var Types = require('react').PropTypes

module.exports = {

  propTypes: {
    onFetch : Types.func
  },

  getDefaultProps() {
    return {
      onFetch : data => data
    }
  },

  getInitialState() {
    return {
      items : [],
      error : false
    }
  },

  componentWillMount() {
    Photo.fetch(this.props.url, this.responseDidSucceed, this.responseDidFail)
  },

  responseDidSucceed(raw) {
    var items = this.props.onFetch(raw)

    this.setState({ items, error: false })
  },

  responseDidFail(error) {
    this.setState({ error })
  }

}
