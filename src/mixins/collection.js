/**
 * Collection Mixin
 * Sync operations for a list of items
 */

import Sync from './sync'

export default {

  mixins: [ Sync ],

  getInitialState() {
    items : []
  },

  componentDidMount() {
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
