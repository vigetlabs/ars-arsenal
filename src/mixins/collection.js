/**
 * Collection Mixin
 * Sync operations for a list of items
 */

let Sync      = require('./sync')
let invariant = require("invariant")

module.exports = {

  mixins: [ Sync ],

  getInitialState() {
    items : []
  },

  componentDidMount() {
    this.fetch()
  },

  componentWillMount() {
    invariant(this.responseDidSucceed, 'Component requires a responseDidSucceed method')
    invariant(this.responseDidFail, 'Component requires a responseDidFail method')
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
