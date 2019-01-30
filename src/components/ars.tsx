/**
 * Ars
 * The main element for Ars Arsenal
 */

import * as React from 'react'
import cx from 'classnames'
import Picker from './picker'
import Selection from './selection'
import MultiSelection from './multiselection'
import OptionsContext from '../contexts/options'
import { ID } from '../record'
import { DEFAULT_OPTIONS, ArsOptions } from '../options'

interface State {
  dialogOpen: boolean
  picked: ID[]
}

export default class Ars extends React.Component<ArsOptions, State> {
  static defaultProps = DEFAULT_OPTIONS

  constructor(props: ArsOptions) {
    super(props)

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
        onChange={this.onGalleryPicked}
        onExit={this.onExit}
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
          ids={picked}
          onEdit={this.onOpenClick}
          onClear={this.onClear}
        />
      )
    }

    return (
      <Selection
        resource={resource}
        id={picked && picked[0]}
        onEdit={this.onOpenClick}
        onClear={this.onClear}
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

  private triggerChange = () => {
    let { picked } = this.state
    this.props.onChange(this.props.multiselect ? picked : picked[0])
  }

  private onOpenClick = () => {
    this.setState({ dialogOpen: true })
  }

  private onGalleryPicked = (picked: ID[]) => {
    this.setState({ picked }, this.triggerChange)
  }

  private onClear = () => {
    this.setState({ picked: [] }, this.triggerChange)
  }

  private onExit = (event?: React.SyntheticEvent) => {
    if (event) {
      event.preventDefault()
    }

    this.setState({ dialogOpen: false })
  }
}
