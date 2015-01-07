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
    onFetch    : Types.func
  },

  getDefaultProps() {
    return {
      onFetch    : data => data,
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
    let url = this.props.urlBuilder(this.props.url, this.state.search)

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

  responseDidSucceed(raw) {
    let items = this.props.onFetch(raw)

    this.setState({ items, error: false })
  },

  responseDidFail(error) {
    this.setState({ error })
  }

}
