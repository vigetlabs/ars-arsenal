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
  static getDerivedStateFromProps(props: *, lastState: *): * {
    let targetURL = props.makeURL(props.url, props.slug)

    return {
      targetURL,
      shouldFetch: targetURL !== lastState.targetURL && isValidSlug(props.slug)
    }
  }
}

export default function LoadRecord(props: *) {
  return (
    <OptionsContext.Consumer>
      {options => <RecordFetcher {...options} {...props} />}
    </OptionsContext.Consumer>
  )
}
