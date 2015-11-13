describe('Collection Mixin', function() {
  let Sync       = require('../sync')
  let Collection = require('../collection')
  let React      = require('react')

  function makeComponent() {
    return React.createClass({
      displayName: 'CollectionTest',
      mixins: [ Collection ],
      render: () => (<p />)
    })
  }

  it ("fetches on mount", function() {
    let stub      = sinon.stub(Sync, 'fetch')
    let Component = makeComponent()
    let component = TestUtils.renderIntoDocument(<Component url="base/test/test.json" />)

    stub.should.have.been.called
    stub.restore()
  })

  describe('responseDidSucceed', function() {
    let Component = makeComponent()
    let onFetch   = sinon.spy()

    it ("calls onFetch when a response succeeds", function() {
      let component = TestUtils.renderIntoDocument(<Component url="base/test/test.json" onFetch={ onFetch } />)

      component.responseDidSucceed('body')

      onFetch.should.have.been.calledWith('body')
    })

    it ("sets the error state to false", function() {
      let component = TestUtils.renderIntoDocument(<Component url="base/test/test.json" onFetch={ onFetch } />)

      component.responseDidSucceed()

      component.state.error.should.equal(false)
    })

    it ("sets the items state to the returned value of onFetch", function() {
      let onFetch   = () => 'fetched';
      let component = TestUtils.renderIntoDocument(<Component url="base/test/test.json" onFetch={ onFetch } />)

      component.responseDidSucceed()

      component.state.should.have.property('items', 'fetched')
    })

  })

  describe('responseDidFail', function() {
    let Component = makeComponent()

    it ("sets the error state to the returned value of onError", function() {
      let onError   = (response) => `${ response } error!`
      let component = TestUtils.renderIntoDocument(<Component url="base/test/test.json" onError={ onError }/>)

      component.responseDidFail('terrible')

      component.state.should.have.property('error', 'terrible error!')
    })

  })

})
