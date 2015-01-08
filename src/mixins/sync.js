/**
 * Sync Mixin
 * Encapsulates data operations required for retrieving photos
 */

import Photo     from "../stores/photo"
import React     from "react"

let Types = React.PropTypes

export default {

  propTypes: {
    url       : Types.string.isRequired,
    makeQuery : Types.func,
    makeURL   : Types.func,
    onError   : Types.func,
    onFetch   : Types.func
  },

  getDefaultProps() {
    return {
      onFetch   : data => data,
      onError   : response => response,
      makeURL   : (url, id = false) => url + (id ? "/" + id : ""),
      makeQuery : (query) => `q=${ query }`
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

  fetch(slug) {
    let url = this.props.makeURL(this.props.url, slug)

    if (this.state.request) {
      this.state.request.abort()
    }

    if (this.state.search) {
      url = url + "?" + this.props.makeQuery(this.state.search)
    }

    this.setState({
      request: Photo.fetch(url, this.responseDidSucceed, this.responseDidFail)
    })
  }

}
