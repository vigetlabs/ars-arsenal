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
import cx from 'classnames'
import { func } from 'prop-types'

let Ars = createClass({
  mixins: [Sync],

  propTypes: {
    onChange: func
  },

  getDefaultProps() {
    return {
      onChange: () => {},
      rootAttributes: {},
      multiselect: false,
      resource: 'Photo',
      mode: 'gallery'
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
    let { columns, multiselect, mode } = this.props

    return (
      <Picker
        key="dialog"
        ref="picker"
        {...this.syncProps()}
        onChange={this._onGalleryPicked}
        onExit={this._onExit}
        picked={picked}
        mode={mode}
        multiselect={multiselect}
        columns={columns}
      />
    )
  },

  render() {
    const { multiselect, resource, rootAttributes } = this.props
    const { dialogOpen, picked } = this.state

    let SelectionComponent = multiselect ? MultiSelection : Selection
    let ref = multiselect ? 'multiselection' : 'selection'
    let slug = this.props.multiselect ? picked : picked && picked[0]
    const rootClass = cx('ars', rootAttributes.className)
    delete rootAttributes.className

    return (
      <div className={rootClass} {...rootAttributes}>
        <SelectionComponent
          ref={ref}
          {...this.syncProps()}
          resource={resource}
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
