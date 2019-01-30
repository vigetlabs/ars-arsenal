/**
 * SelectionText
 */

import articleFor from '../utils/article-for'
import pluralize from '../utils/pluralize'

interface Options {
  resource: string
  fetching: boolean
  item: boolean
  isPlural: boolean
}

export default function selectionText(options: Options) {
  let resource = options.resource || 'Photo'
  let fetching = options.fetching
  let isPlural = options.isPlural
  let item = options.item

  let noun = getNoun(resource, isPlural)

  if (fetching) {
    return getLoadingText(noun)
  }

  if (item) {
    return getSelectedText(noun, isPlural)
  }

  return getEmptyText(articleFor(noun), noun, isPlural)
}

function getNoun(resource: string, isPlural: boolean) {
  let noun = resource.toLowerCase()

  if (isPlural) {
    noun = pluralize(noun)
  }

  return noun
}

function getEmptyText(article: string, noun: string, isPlural: boolean) {
  let a = isPlural ? ' ' : ` ${article} `
  return `Pick${a}${noun}`
}

function getSelectedText(noun: string, isPlural: boolean) {
  let a = isPlural ? ' ' : ' a '
  return `Pick${a}different ${noun}`
}

function getLoadingText(noun: string) {
  return `Loading ${noun}`
}
