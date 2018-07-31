/*
 * @flow
 */

export type Record = {
  id: string | number,
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
