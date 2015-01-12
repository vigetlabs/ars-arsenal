/**
 * Sync Mixin
 * Encapsulates data operations required for retrieving photos
 */

import React from "react"
import XHR   from 'xhr'

let Types = React.PropTypes

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
      makeURL   : (url, id = false) => url + (id ? "/" + id : ""),
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

export default Sync
