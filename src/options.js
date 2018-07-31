/**
 * These are all options available to Ars Arsenal
 * @flow
 */

export interface Options {
  url: string;
  makeUrl: (string, *) => string;
  makeQuery: string => string;
  rootAttributes: { [string]: * };
  onError: (*) => *;
  onFetch: (*) => *;
  onChange: (*) => *;
  multiselect: boolean;
  resource: string;
  mode: 'gallery' | 'table';
}

export const DEFAULT_OPTIONS: Options = {
  url: '',
  makeURL(url: string, id: *) {
    return url + (id ? '/' + String(id) : '')
  },
  makeQuery(query: string) {
    return `q=${query}`
  },
  rootAttributes: {},
  onError(response: *) {
    return response
  },
  onFetch(data: *) {
    return data
  },
  onChange(picked) {
    // do nothing
  },
  multiselect: false,
  resource: 'Photo',
  mode: 'gallery'
}
