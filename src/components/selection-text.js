/**
 * SelectionText
 */

import React from 'react'
import articleFor from '../utils/article-for'
import pluralize from '../utils/pluralize'
import createClass from 'create-react-class'
import { string } from 'prop-types'

let SelectionText = createClass({
  propTypes: {
    resource: string.isRequired
  },

  getNoun(resource, isPlural = false) {
    let noun = resource.toLowerCase()

    if (isPlural) {
      noun = pluralize(noun)
    }

    return noun
  },

  getEmptyText(article, noun, isPlural) {
    let a = isPlural ? ' ' : ` ${article} `
    return `Pick${a}${noun}`
  },

  getSelectedText(noun, isPlural) {
    let a = isPlural ? ' ' : ' a '
    return `Pick${a}different ${noun}`
  },

  getLoadingText(noun) {
    return `Loading ${noun}`
  },

  getText() {
    let { resource, fetching, item, isPlural } = this.props
    let noun = this.getNoun(resource, isPlural)

    if (fetching) {
      return this.getLoadingText(noun)
    } else if (item) {
      return this.getSelectedText(noun, isPlural)
    } else {
      return this.getEmptyText(articleFor(noun), noun, isPlural)
    }
  },

  render() {
    return (
      <span>
        {this.getText()}
      </span>
    )
  }
})

export default SelectionText
