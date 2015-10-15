/**
 * Collection Mixin
 * Sync operations for a list of items
 */

let Sync      = require('./sync')
let invariant = require("react/lib/invariant")

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

    // This is a total freakin' hack. Change it. - @ltk
    let picked = this.state.picked.map((item) => {
      if(typeof item === 'number') {
        return items.find((itemObject) => itemObject.id === item)
      } else {
        return item
      }
    })

    this.setState({ items, picked, error: false })
  },

  responseDidFail(response) {
    let error = this.props.onError(response)

    this.setState({ error })
  }

}
