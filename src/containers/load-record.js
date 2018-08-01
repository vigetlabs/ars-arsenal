/**
 * LoadRecord
 * Fetch and present a single item
 * @flow
 */

import React from 'react'
import DataFetcher from './data-fetcher'
import OptionsContext from '../contexts/options'

function isValidSlug(slug: any): boolean {
  return !!slug || slug === 0
}

class RecordFetcher extends DataFetcher {
  shouldFetch(nextURL, lastURL, props) {
    return nextURL !== lastURL && isValidSlug(props.slug)
  }
}

export default function LoadRecord(props: *) {
  return (
    <OptionsContext.Consumer>
      {options => <RecordFetcher {...options} {...props} defaultValue={null} />}
    </OptionsContext.Consumer>
  )
}
