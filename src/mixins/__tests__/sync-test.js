jest.autoMockOff()

describe('Sync Mixin', function() {
  let Sync  = require('../sync')
  let React = require('react/addons')
  let Test  = React.addons.TestUtils

  function makeComponent() {
    return React.createClass({
      mixins: [ Sync ],
      render: () => (<p />)
    })
  }

  it ("has a default onFetch method", function() {
    let onFetch = Sync.getDefaultProps().onFetch

    expect(onFetch('success')).toEqual('success')
  })

  it ("has a default onError method", function() {
    let onError = Sync.getDefaultProps().onError

    expect(onError('error')).toEqual('error')
  })

  describe('makeUrl', function() {

    it ("returns a url when no slug is given", function() {
      let makeURL = Sync.getDefaultProps().makeURL

      expect(makeURL('route')).toEqual('route')
    })

    it ("appends a slug when provided", function() {
      let makeURL = Sync.getDefaultProps().makeURL

      expect(makeURL('route', 'fiz')).toEqual('route/fiz')
    })

  })

  describe('makeQuery', function() {

    it ("constructs a query given a term", function() {
      let makeQuery = Sync.getDefaultProps().makeQuery

      expect(makeQuery('term')).toEqual('q=term')
    })

  })

})
