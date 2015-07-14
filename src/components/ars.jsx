/**
 * Ars
 * The main element for Ars Arsenal
 */

let Picker         = require('./picker')
let React          = require('react')
let Selection      = require('./selection')
let MultiSelection = require('./multiselection')
let Sync           = require('../mixins/sync')

let Ars = module.exports = React.createClass({

  mixins: [ Sync ],

  propTypes: {
    onChange : React.PropTypes.func
  },

  getDefaultProps() {
    return {
      onChange    : () => {},
      multiselect : false,
      picked      : []
    }
  },

  getInitialState() {
    return {
      dialogOpen : false,
      picked     : this.props.picked
    }
  },

  getPicker() {
    let { picked } = this.state
    let { multiselect } = this.props

    return (
      <Picker key="dialog" ref="picker" { ...this.syncProps() } onChange={ this._onGalleryPicked } onExit={ this._onExit } picked={ picked } multiselect={ multiselect } />
    )
  },

  render() {
    let { dialogOpen, picked } = this.state
    let SelectionComponent = this.props.multiselect ? MultiSelection : Selection
    let ref = SelectionComponent.displayName.toLowerCase()

    return (
      <div className="ars">
        <SelectionComponent ref={ ref } { ...this.syncProps() } onClick={ this._onOpenClick } slug={ picked } />
        { dialogOpen && this.getPicker() }
      </div>
    )
  },

  _triggerChange() {
    this.props.onChange(this.state.picked)
  },

  _onOpenClick() {
    this.setState({ dialogOpen: true })
  },

  _onGalleryPicked(picked) {
    this.setState({ picked }, this._triggerChange)
  },

  _onExit() {
    this.setState({ dialogOpen: false })
  }

})
