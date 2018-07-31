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

type Props = {
  makeQuery: string => string,
  makeURL: (string, any) => string,
  rootAttributes: { [string]: * },
  multiselect: boolean,
  resource: string,
  mode: 'gallery' | 'table',
  picked: string | number | Array<string | number>,
  columns?: string[],
  url: string,
  onFetch: (*) => Record,
  onError: (*) => *,
  onChange: (*) => any
}

type State = {
  dialogOpen: boolean,
  picked: Array<string | number>
}

export default class Ars extends React.Component<Props, State> {
  static defaultProps = {
    makeQuery: (query: string) => `q=${query}`,
    makeURL: (url: string, id: ?mixed) => url + (id ? '/' + String(id) : ''),
    onError: (response: *) => response,
    onFetch: (data: *) => data,
    onChange: () => {},
    rootAttributes: {},
    multiselect: false,
    resource: 'Photo',
    mode: 'gallery',
    url: ''
  }

  constructor(props: Props, context: *) {
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

  render() {
    let { multiselect, resource, rootAttributes } = this.props
    let { dialogOpen, picked } = this.state

    let rootClass = cx('ars', rootAttributes.className)

    if (multiselect) {
      return (
        <div {...rootAttributes} className={rootClass}>
          <MultiSelection
            {...this.syncProps()}
            resource={resource}
            slugs={picked}
            onClick={this._onOpenClick.bind(this)}
          />
          {dialogOpen && this.getPicker()}
        </div>
      )
    }

    return (
      <div {...rootAttributes} className={rootClass}>
        <Selection
          {...this.syncProps()}
          resource={resource}
          slug={picked && picked[0]}
          onClick={this._onOpenClick.bind(this)}
        />
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
