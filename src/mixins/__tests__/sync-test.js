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

    onFetch('success').should.equal('success')
  })

  it ("has a default onError method", function() {
    let onError = Sync.getDefaultProps().onError

    onError('error').should.equal('error')
  })

  describe('makeUrl', function() {
    it ("returns a url when no slug is given", function() {
      let makeURL = Sync.getDefaultProps().makeURL

      makeURL('route').should.equal('route')
    })

    it ("appends a slug when provided", function() {
      let makeURL = Sync.getDefaultProps().makeURL

      makeURL('route', 'fiz').should.equal('route/fiz')
    })
  })

  describe('makeQuery', function() {
    it ("constructs a query given a term", function() {
      let makeQuery = Sync.getDefaultProps().makeQuery

      makeQuery('term').should.equal('q=term')
    })
  })

  describe('syncProps', function() {
    it ("returns a set list of properties related to syncing", function() {
      let props = {
        makeURL   : true,
        makeQuery : true,
        onError   : true,
        onFetch   : true,
        url       : true
      }

      let result = Sync.syncProps.call({ props })

      result.should.have.property('makeURL', props.makeURL)
      result.should.have.property('makeQuery', props.makeQuery)
      result.should.have.property('onError', props.onError)
      result.should.have.property('onFetch', props.onFetch)
      result.should.have.property('url', props.url)
    })
  })

})
