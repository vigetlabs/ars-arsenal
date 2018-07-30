/**
 * MultiSelectionItem
 * @flow
 */

import React from 'react'
import cx from 'classnames'
import Image from './ui/image'
import Show from '../containers/show'

type Props = {
  slug: ?string,
  url: string
}

export default class MultiSelectionItem extends React.Component<Props> {
  getPhoto({ name, url }) {
    return (
      <Image ref="photo" className="ars-selection-photo" alt={name} src={url} />
    )
  }

  renderContent({ data, fetching }) {
    let className = cx('ars-multiselection-cell', {
      'ars-is-loading': fetching,
      'ars-has-photo': data
    })

    return (
      <div className={className}>{fetching ? null : this.getPhoto(data)}</div>
    )
  }

  render() {
    let { url, slug } = this.props

    return (
      <Show url={url} slug={slug} children={this.renderContent.bind(this)} />
    )
  }
}
