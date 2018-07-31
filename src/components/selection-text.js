/**
 * SelectionText
 * @flow
 */

import React from 'react'
import articleFor from '../utils/article-for'
import pluralize from '../utils/pluralize'

type Props = {
  resource: string,
  fetching: boolean,
  item: boolean,
  isPlural: boolean
}

export default class SelectionText extends React.Component<Props> {
  static defaultProps = {
    resource: 'Photo',
    fetching: false,
    item: false,
    isPlural: false
  }

  getNoun(resource: string, isPlural: boolean) {
    let noun = resource.toLowerCase()

    if (isPlural) {
      noun = pluralize(noun)
    }

    return noun
  }

  getEmptyText(article: string, noun: string, isPlural: boolean) {
    let a = isPlural ? ' ' : ` ${article} `
    return `Pick${a}${noun}`
  }

  getSelectedText(noun: string, isPlural: boolean) {
    let a = isPlural ? ' ' : ' a '
    return `Pick${a}different ${noun}`
  }

  getLoadingText(noun: string) {
    return `Loading ${noun}`
  }

  render() {
    let { resource, fetching, item, isPlural } = this.props
    let noun = this.getNoun(resource, isPlural)

    if (fetching) {
      return this.getLoadingText(noun)
    } else if (item) {
      return this.getSelectedText(noun, isPlural)
    } else {
      return this.getEmptyText(articleFor(noun), noun, isPlural)
    }
  }
}
