import articleFor from '../article-for'

describe('articleFor', function() {
  it('returns the article preceeding the given noun', function() {
    expect(articleFor('photo')).to.equal('a')
    expect(articleFor('image')).to.equal('an')
  })
})
