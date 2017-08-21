import pluralize from '../pluralize'

describe('pluralize', () => {
  test('pluralizes a string', () => {
    expect(pluralize('photo')).toBe('photos')
    expect(pluralize('photos')).toBe('photos')
  })
})
