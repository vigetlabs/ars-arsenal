import { dedupe } from '../collection'

describe('dedupe', () => {
  test('eliminates duplicates given a key', () => {
    let result = dedupe([{ id: 1 }, { id: 2 }, { id: 1 }], 'id')

    expect(result).toHaveLength(2)
    expect(result.map(r => r.id)).toEqual([1, 2])
  })

  test('handles cases when all items are unique', () => {
    let result = dedupe([{ id: 1 }, { id: 2 }], 'id')

    expect(result).toHaveLength(2)
    expect(result.map(r => r.id)).toEqual([1, 2])
  })
})
