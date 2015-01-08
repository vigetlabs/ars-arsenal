jest.autoMockOff()

describe('Record Mixin', function() {
  let Sync   = require('../sync')
  let Record = require('../record')
  let React  = require('react/addons')
  let Test   = React.addons.TestUtils

  function makeComponent() {
    return React.createClass({
      mixins: [ Record ],
      render: () => (<p />)
    })
  }

  describe("componentWillMount", function() {

    it ("fetches on mount if given a slug", function() {
      Sync.fetch = jest.genMockFunction()

      let Component = makeComponent()
      let component = Test.renderIntoDocument(<Component url="test" slug="test" />)

      expect(Sync.fetch).toBeCalledWith("test")
    })

    it ("does not fetch on mount if no slug is provided", function() {
      Sync.fetch = jest.genMockFunction()

      let Component = makeComponent()
      let component = Test.renderIntoDocument(<Component url="test" />)

      expect(Sync.fetch).not.toBeCalled()
    })

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

    it ("sets the item state to the returned value of onFetch", function() {
      let onFetch   = () => 'fetched';
      let component = Test.renderIntoDocument(<Component onFetch={ onFetch } />)

      component.responseDidSucceed()

      expect(component.state.item).toEqual('fetched')
    })

  })

  describe('responseDidFail', function() {
    let Component = makeComponent()

    it ("sets the error state to the returned value of onError, and item to false", function() {
      let onError   = (response) => `${ response } error!`
      let component = Test.renderIntoDocument(<Component onError={ onError }/>)

      component.responseDidFail('terrible')

      expect(component.state.error).toEqual('terrible error!')
      expect(component.state.item).toEqual(false)
    })

  })

})
