export type ID = string | number

export interface Record {
  id: ID
  caption: string
  name: string
  attribution: string
  url: string
  tags: string[]
}

export const EmptyRecord: Record = {
  id: '__ars-arsenal-empty-record',
  caption: '',
  name: '',
  attribution: '',
  url: '',
  tags: []
}
