/**
 * These are all options available to Ars Arsenal
 */

import { request } from './request'
import { ID, Record } from './record'

export type ArsMode = 'gallery' | 'table'

export type SortableColumn = keyof Record

export type ArsColumn = SortableColumn | 'preview'

export type SearchQuery = {
  page: number
  search: string
  sort: SortableColumn
}

export interface ArsOptions {
  // The base URL for API interaction
  url: string
  // Used to build the URL that fetches lists of records.
  listUrl: (url: string) => string
  // Used to rename query parameters before building a list endpoint URL
  listQuery: (query: SearchQuery) => Object
  // Used to build the URL that fetches a single record.
  showUrl: (url: string, slug: ID) => string
  // Configure the root element's HTML attributes
  rootAttributes: { [key: string]: number | string | boolean }
  // Format errors before they are sent as a "string" value
  // to the component
  onError: (error: Error) => string
  // Format the response, useful if you do not control the
  // JSON response from your endpoint
  onFetch: (response: Object) => Object
  // Whenever a new item is picked, this event is triggered
  // When using multiselect: true, this is an array of values
  onChange: (slug: ID | ID[]) => void
  // Are multiple selections possible?
  multiselect: boolean
  // The noun used for selection, i.e. "photo" or "file"
  // This shows up in the UI as "Pick a photo"
  resource: string
  // How to display the items. Can be "table" or "gallery"
  mode: ArsMode
  // In mode: 'table', sets the displayed columns, and the order
  columns: ArsColumn[]
  // Existing selections
  picked?: ID | ID[]
  // What utility should Ars use for network requests?
  request: typeof request
}

export interface ArsOptionsWithDeprecations extends ArsOptions {
  makeURL?: (url: string, slug?: ID) => string
  makeQuery?: (term: string) => string
}

export const DEFAULT_OPTIONS: ArsOptions = {
  url: '',
  listUrl: (url: string) => url,
  listQuery: query => ({ q: query.search }),
  showUrl: (url: string, slug: ID) => `${url}/${slug}`,
  rootAttributes: { className: '' },
  onError: error => error.message,
  onFetch: data => data,
  onChange: picked => {},
  multiselect: false,
  resource: 'Photo',
  mode: 'gallery',
  columns: ['id', 'name', 'caption', 'attribution', 'preview'],
  request: request
}
