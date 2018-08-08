/**
 * Ars
 * The main element for Ars Arsenal
 * @flow
 */

import React from 'react'
import cx from 'classnames'
import Picker from './picker'
import Selection from './selection'
import MultiSelection from './multiselection'
import OptionsContext from '../contexts/options'
import { type ID } from '../record'
import { DEFAULT_OPTIONS, type ArsOptions } from '../options'

type State = {
  dialogOpen: boolean,
  picked: ID[]
}

export default class Ars extends React.Component<ArsOptions, State> {
  static defaultProps = DEFAULT_OPTIONS

  constructor(props: ArsOptions, context: *) {
    super(props, context)

    this.state = {
      dialogOpen: false,
      picked: [].concat(props.picked || [])
    }
  }

  getPicker() {
    let { picked } = this.state
    let { columns, multiselect, mode } = this.props

    return (
      <Picker
        picked={picked}
        mode={mode}
        multiselect={multiselect}
        columns={columns}
        onChange={this._onGalleryPicked.bind(this)}
        onExit={this._onExit.bind(this)}
      />
    )
  }

  renderSelection() {
    let { multiselect, resource } = this.props
    let { picked } = this.state

    if (multiselect) {
      return (
        <MultiSelection
          resource={resource}
          slugs={picked}
          onClick={this._onOpenClick.bind(this)}
        />
      )
    }

    return (
      <Selection
        resource={resource}
        slug={picked && picked[0]}
        onClick={this._onOpenClick.bind(this)}
      />
    )
  }

  render() {
    let { rootAttributes } = this.props
    let { dialogOpen } = this.state

    let rootClass = cx('ars', rootAttributes.className)

    return (
      <OptionsContext.Provider value={this.props}>
        <div {...rootAttributes} className={rootClass}>
          {this.renderSelection()}
          {dialogOpen && this.getPicker()}
        </div>
      </OptionsContext.Provider>
    )
  }

  _triggerChange() {
    let { picked } = this.state
    this.props.onChange(this.props.multiselect ? picked : picked[0])
  }

  _onOpenClick() {
    this.setState({ dialogOpen: true })
  }

  _onGalleryPicked(picked: *) {
    this.setState({ picked }, this._triggerChange.bind(this))
  }

  _onExit(event?: SyntheticEvent<*>) {
    if (event) {
      event.preventDefault()
    }

    this.setState({ dialogOpen: false })
  }
}
