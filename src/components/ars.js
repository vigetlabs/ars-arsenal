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
import { type Record } from '../record'
import { DEFAULT_OPTIONS, Options } from '../options'

type State = {
  dialogOpen: boolean,
  picked: Array<string | number>
}

export default class Ars extends React.Component<Options, State> {
  static defaultProps = DEFAULT_OPTIONS

  constructor(props: Options, context: *) {
    super(props, context)

    this.state = {
      dialogOpen: false,
      picked: [].concat(props.picked || [])
    }
  }

  syncProps() {
    let { makeURL, makeQuery, onError, onFetch, url } = this.props
    return { makeURL, makeQuery, onError, onFetch, url }
  }

  getPicker() {
    let { picked } = this.state
    let { columns, multiselect, mode } = this.props

    return (
      <Picker
        {...this.syncProps()}
        onChange={this._onGalleryPicked.bind(this)}
        onExit={this._onExit.bind(this)}
        picked={picked}
        mode={mode}
        multiselect={multiselect}
        columns={columns}
      />
    )
  }

  renderSelection() {
    let { multiselect, resource, rootAttributes } = this.props
    let { picked } = this.state

    if (multiselect) {
      return (
        <MultiSelection
          {...this.syncProps()}
          resource={resource}
          slugs={picked}
          onClick={this._onOpenClick.bind(this)}
        />
      )
    }

    return (
      <Selection
        {...this.syncProps()}
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
      <div {...rootAttributes} className={rootClass}>
        {this.renderSelection()}
        {dialogOpen && this.getPicker()}
      </div>
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
