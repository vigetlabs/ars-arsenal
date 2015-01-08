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

  beforeEach(function() {
    Sync = require('../sync')
  })

  it ("has a default onFetch method", function() {
    let onFetch = Sync.getDefaultProps().onFetch

    expect(onFetch(true)).toEqual(true)
  })

  it ("has a default urlBuilder method", function() {
    let urlBuilder = Sync.getDefaultProps().urlBuilder

    expect(urlBuilder('route', 'query')).toEqual('route?q=query')
  })

  it ("fetches on mount", function() {
    Sync.fetch = jest.genMockFunction();

    let Component = makeComponent()
    let component = Test.renderIntoDocument(<Component url="test" />)

    expect(Sync.fetch).toBeCalled()
  })

  describe('responseDidSucceed', function() {
    let Component = makeComponent()
    let onFetch   = jest.genMockFunction();

    it ("calls onFetch when a response succeeds", function() {
      let component = Test.renderIntoDocument(<Component onFetch={ onFetch } />)

      component.responseDidSucceed('body')

      expect(onFetch).toBeCalledWith('body')
    })

    it ("sets the error state to false", function() {
      let component = Test.renderIntoDocument(<Component onFetch={ onFetch } />)

      component.responseDidSucceed()

      expect(component.state.error).toEqual(false)
    })

    it ("sets the items state to the returned value of onFetch", function() {
      let onFetch   = () => 'fetched';
      let component = Test.renderIntoDocument(<Component onFetch={ onFetch } />)

      component.responseDidSucceed()

      expect(component.state.items).toEqual('fetched')
    })

  })

  describe('responseDidFail', function() {
    let Component = makeComponent()

    it ("sets the error state to the returned value of onError", function() {
      let onError   = (response) => `${ response } error!`
      let component = Test.renderIntoDocument(<Component onError={ onError }/>)

      component.responseDidFail('terrible')

      expect(component.state.error).toEqual('terrible error!')
    })

  })

})
