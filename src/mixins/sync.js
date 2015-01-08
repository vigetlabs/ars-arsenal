/**
 * Sync Mixin
 * Encapsulates data operations required for retrieving photos
 */

import Photo from '../stores/photo'
import React from 'react'

let Types = React.PropTypes

export default {

  propTypes: {
    buildQuery : Types.func,
    onError    : Types.func,
    onFetch    : Types.func
  },

  getDefaultProps() {
    return {
      onFetch    : data => data,
      onError    : response => response,
      urlBuilder : (url, query) => `${ url }?q=${ query }`
    }
  },

  getInitialState() {
    return {
      error  : false,
      items  : [],
      search : ''
    }
  },

  fetch() {
    let url = this.state.search? this.props.urlBuilder(this.props.url, this.state.search) : this.props.url

    if (this.state.request) {
      this.state.request.abort()
    }

    this.setState({
      request: Photo.fetch(url, this.responseDidSucceed, this.responseDidFail)
    })
  },

  componentWillMount() {
    this.fetch()
  },

  responseDidSucceed(response) {
    let items = this.props.onFetch(response)

    this.setState({ items, error: false })
  },

  responseDidFail(response) {
    let error = this.props.onError(response)

    this.setState({ error })
  }

}
