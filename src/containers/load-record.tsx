/**
 * LoadRecord
 * Fetch and present a single item
 */

import * as React from 'react'
import DataFetcher from './data-fetcher'
import OptionsContext from '../contexts/options'
import { ID, Record } from '../record'

export interface RecordResult {
  data: Record | null
  fetching: boolean
  error: string | null
}

interface Props {
  slug: ID | null
  render: (result: RecordResult) => React.ReactNode
}

function isValidSlug(slug: ID): boolean {
  return !!slug || slug === 0
}

class RecordFetcher extends DataFetcher<Record> {
  shouldFetch(nextURL: string, lastURL: string, props: Props) {
    return nextURL !== lastURL && isValidSlug(props.slug)
  }
}

export default function LoadRecord(props: Props) {
  return (
    <OptionsContext.Consumer>
      {options => <RecordFetcher {...options} {...props} defaultValue={null} />}
    </OptionsContext.Consumer>
  )
}
