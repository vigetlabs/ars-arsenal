/**
 * LoadCollection
 * Fetch and present a list of items
 * @flow
 */

import React from 'react'
import DataFetcher from './data-fetcher'
import OptionsContext from '../contexts/options'

class CollectionFetcher extends DataFetcher {
  shouldFetch(nextURL, lastURL) {
    return nextURL !== lastURL
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
