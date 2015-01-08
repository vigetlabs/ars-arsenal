/**
 * Record Mixin
 * Sync operations for a single record
 */

import Sync from "./sync"

export default {

  mixins: [ Sync ],

  getInitialState() {
    return {
      item : false
    }
  },

  fetchIf(slug) {
    if (slug != undefined) {
      this.fetch(slug)
    }
  },

  componentWillMount() {
    this.fetchIf(this.props.slug)
  },

  componentWillReceiveProps(props) {
    if (props.slug !== this.props.slug) {
      this.fetchIf(props.slug)
    }
  },

  responseDidSucceed(response) {
    let item = this.props.onFetch(response)

    this.setState({ item, error: false })
  },

  responseDidFail(response) {
    let error = this.props.onError(response)

    this.setState({ item: false, error })
  }

}
