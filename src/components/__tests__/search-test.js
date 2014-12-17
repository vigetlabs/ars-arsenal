jest.dontMock('../search')
jest.dontMock('../../mixins/uniqueId')

describe('Search', function() {
  var React  = require('react/addons')
  var Search = require('../search')
  var Test   = React.addons.TestUtils

  it ('triggers a blank search below 2 characters', function() {
    var callback  = jest.genMockFunction()
    var component = Test.renderIntoDocument(<Search onChange={ callback } />)

    Test.Simulate.change(component.refs.input.getDOMNode())

    expect(callback).lastCalledWith('')
  })

  it ('triggers the full term above 2 characters', function() {
    var callback  = jest.genMockFunction()
    var component = Test.renderIntoDocument(<Search onChange={ callback } />)
    var input     = component.refs.input.getDOMNode()

    input.value = 'Large Enough'

    Test.Simulate.change(input)

    expect(callback).lastCalledWith('Large Enough')
  })

})
