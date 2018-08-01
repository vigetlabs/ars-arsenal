/**
 * LoadCollection
 * Fetch and present a list of items
 * @flow
 */

import React from 'react'
import DataFetcher from './data-fetcher'
import OptionsContext from '../contexts/options'

class CollectionFetcher extends DataFetcher {
  static getDerivedStateFromProps(props: *, lastState: *): * {
    let targetURL = props.makeURL(props.url, props.slug)

    if (props.search) {
      targetURL += '?' + props.makeQuery(props.search)
    }

    return {
      targetURL,
      shouldFetch: targetURL !== lastState.targetURL
    }
  }
}

export default function LoadCollection(props: *) {
  return (
    <OptionsContext.Consumer>
      {options => (
        <CollectionFetcher {...options} {...props} defaultValue={[]} />
      )}
    </OptionsContext.Consumer>
  )
}
