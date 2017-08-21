/**
 * Ars
 * The main element for Ars Arsenal
 */

import Picker from './picker'
import React from 'react'
import Selection from './selection'
import MultiSelection from './multiselection'
import Sync from '../mixins/sync'
import createClass from 'create-react-class'
import { func } from 'prop-types'

let Ars = createClass({
  mixins: [Sync],

  propTypes: {
    onChange: func
  },

  getDefaultProps() {
    return {
      onChange: () => {},
      multiselect: false,
      resource: 'Photo'
    }
  },

  getInitialState() {
    let { picked } = this.props
    if (picked && !Array.isArray(picked)) {
      picked = [picked]
    }

    return {
      dialogOpen: false,
      picked: picked
    }
  },

  getPicker() {
    let { picked } = this.state
    let { multiselect } = this.props

    return (
      <Picker
        key="dialog"
        ref="picker"
        {...this.syncProps()}
        onChange={this._onGalleryPicked}
        onExit={this._onExit}
        picked={picked}
        multiselect={multiselect}
      />
    )
  },

  render() {
    let { dialogOpen, picked } = this.state
    let SelectionComponent = this.props.multiselect ? MultiSelection : Selection
    let ref = SelectionComponent.displayName.toLowerCase()
    let slug = this.props.multiselect ? picked : picked && picked[0]

    return (
      <div className="ars">
        <SelectionComponent
          ref={ref}
          {...this.syncProps()}
          resource={this.props.resource}
          onClick={this._onOpenClick}
          slug={slug}
        />
        {dialogOpen && this.getPicker()}
      </div>
    )
  },

  _triggerChange() {
    let { picked } = this.state
    this.props.onChange(this.props.multiselect ? picked : picked[0])
  },

  _onOpenClick() {
    this.setState({ dialogOpen: true })
  },

  _onGalleryPicked(picked) {
    this.setState({ picked }, this._triggerChange)
  },

  _onExit(e) {
    e && e.preventDefault()
    this.setState({ dialogOpen: false })
  }
})

export default Ars
