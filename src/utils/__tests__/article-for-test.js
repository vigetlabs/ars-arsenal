import articleFor from '../article-for'

describe('articleFor', () => {
  test('returns the article preceeding the given noun', () => {
    expect(articleFor('photo')).toBe('a')
    expect(articleFor('image')).toBe('an')
  })
})
