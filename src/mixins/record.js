/**
 * Record Mixin
 * Sync operations for a single record
 */

let Sync      = require("./sync")
let invariant = require("react/lib/invariant")

module.exports = {

  mixins: [ Sync ],

  getInitialState() {
    return {
      fetching : false,
      item     : false
    }
  },

  fetchIf(slug) {
    if (slug != undefined) {
      this.setState({ fetching: true })
      this.fetch(slug)
    }
  },

  componentWillMount() {
    invariant(this.responseDidSucceed, 'Component requires a responseDidSucceed method')
    invariant(this.responseDidFail, 'Component requires a responseDidFail method')

    this.fetchIf(this.props.slug)
  },

  componentWillReceiveProps(props) {
    if (props.slug !== this.props.slug) {
      this.fetchIf(props.slug)
    }
  },

  responseDidSucceed(response) {
    let item = this.props.onFetch(response)

    this.setState({ item, fetching: false, error: false })
  },

  responseDidFail(response) {
    let error = this.props.onError(response)

    this.setState({ item: false, fetching: false, error })
  }

}
