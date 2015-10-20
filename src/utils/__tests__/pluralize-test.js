import pluralize from '../pluralize'

describe('pluralize', function() {
  it ('pluralizes a string', function() {
    expect(pluralize('photo')).to.equal('photos')
    expect(pluralize('photos')).to.equal('photos')
  })
})
