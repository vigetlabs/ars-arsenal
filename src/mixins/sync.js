/**
 * Sync Mixin
 * Encapsulates data operations required for retrieving photos
 */

import Photo from '../stores/photo'
import React from 'react'

let Types = React.PropTypes

export default {

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
    let items = this.props.onFetch(raw)

    this.setState({ items, error: false })
  },

  responseDidFail(error) {
    this.setState({ error })
  }

}
