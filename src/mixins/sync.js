/**
 * Sync Mixin
 * Encapsulates data operations required for retrieving photos
 */

import Photo     from "../stores/photo"
import React     from "react"
import invariant from "react/lib/invariant"

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

  componentWillMount() {
    invariant(this.responseDidSucceed, 'Component requires a responseDidSucceed method')
    invariant(this.responseDidFail, 'Component requires a responseDidFail method')
  },

  fetch(slug) {
    let url = this.props.makeURL(this.props.url, slug)

    if (this.state.request) {
      url = url + "?" + this.props.makeQuery(this.state.search)
    }

    this.setState({
      request: Photo.fetch(url, this.responseDidSucceed, this.responseDidFail)
    })
  }

}
