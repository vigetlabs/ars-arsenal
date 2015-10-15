/**
 * Sync Mixin
 * Encapsulates data operations required for retrieving photos
 */

let React = require("react")
let XHR   = require('xhr')
let Types = React.PropTypes

let defaultMakeURL = function(url, item) {
  let id = null
  if (item) id = item.id || item
  return(url + (id ? "/" + id : ""))
}

let Sync = {

  propTypes: {
    makeQuery : Types.func,
    makeURL   : Types.func,
    onError   : Types.func,
    onFetch   : Types.func,
    url       : Types.string.isRequired
  },

  getDefaultProps() {
    return {
      makeQuery : (query) => `q=${ query }`,
      makeURL   : defaultMakeURL,
      onError   : response => response,
      onFetch   : data => data
    }
  },

  getInitialState() {
    return {
      error  : false,
      search : ""
    }
  },

  syncProps() {
    let { makeURL, makeQuery, onError, onFetch, url } = this.props
    return { makeURL, makeQuery, onError, onFetch, url }
  },

  request(url, success, error) {
    return XHR({ url, json: true }, function(err, response, body) {
      err ? error(body, err) : success(body)
    })
  },

  fetch(slug) {
    let url = this.props.makeURL(this.props.url, slug)

    if (this.state.request) {
      this.state.request.abort()
    }

    if (this.state.search) {
      url = url + "?" + this.props.makeQuery(this.state.search)
    }

    this.setState({
      request: Sync.request(url, this.responseDidSucceed, this.responseDidFail)
    })
  }

}

module.exports = Sync
