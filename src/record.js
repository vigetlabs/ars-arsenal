/*
 * @flow
 */

export type Record = {
  id: string,
  caption: string,
  name: string,
  attribution: string,
  url: string
}

export const EmptyRecord: Record = {
  id: '__ars-arsenal-empty-record',
  caption: '',
  name: '',
  attribution: '',
  url: ''
}
