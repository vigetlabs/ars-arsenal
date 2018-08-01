/**
 * These are all options available to Ars Arsenal
 * @flow
 */

import { type ID, type Record } from './record'

export type ArsMode = 'gallery' | 'table'

export type ArsColumn = $Keys<Record> | 'preview'

export interface ArsOptions {
  // The base URL for API interaction
  url: string;
  // Define how the endpoint url is constructed
  makeURL: (string, ID) => string;
  // Define how the search query string is built
  makeQuery: string => string;
  // Configure the root element's HTML attributes
  rootAttributes: Object;
  // Format errors before they are sent as a "string" value
  // to the component
  onError: (error: *) => string;
  // Format the response, useful if you do not control the
  // JSON response from your endpoint
  onFetch: (respose: *) => *;
  // Whenever a new item is picked, this event is triggered
  // When using multiselect: true, this is an array of values
  onChange: (*) => void;
  // Are multiple selections possible?
  multiselect: boolean;
  // The noun used for selection, i.e. "Pick a photo"
  resource: string;
  // How to display the items. Can be "table" or "gallery"
  mode: ArsMode;
  // In mode: 'table', sets the displayed columns, and the order
  columns: ArsColumn[];
  // Existing selections
  picked?: ID | ID[];
}

export const DEFAULT_OPTIONS: ArsOptions = {
  url: '',
  makeURL(url: string, id: *) {
    return url + (id ? '/' + String(id) : '')
  },
  makeQuery(query: string) {
    return `q=${query}`
  },
  rootAttributes: {},
  onError: response => response,
  onFetch: data => data,
  onChange: picked => {},
  multiselect: false,
  resource: 'Photo',
  mode: 'gallery',
  columns: ['id', 'name', 'caption', 'attribution', 'preview']
}
