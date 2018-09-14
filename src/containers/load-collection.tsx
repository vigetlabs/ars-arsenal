/**
 * LoadCollection
 * Fetch and present a list of items
 */

import * as React from 'react'
import DataFetcher from './data-fetcher'
import OptionsContext from '../contexts/options'
import { ID, Record } from '../record'

export interface CollectionResult {
  data: Record[]
  fetching: boolean
  error: string | null
}

interface Props {
  slug?: ID,
  search: string,
  render: (result: CollectionResult) => React.ReactNode
}

class CollectionFetcher extends DataFetcher<Record[]> {
  shouldFetch(nextURL: string | null, lastURL: string | null) {
    return nextURL !== lastURL
  }
}

export default function LoadCollection(props: Props) {
  return (
    <OptionsContext.Consumer>
      {options => (
        <CollectionFetcher {...options} {...props} defaultValue={[]} />
      )}
    </OptionsContext.Consumer>
  )
}
