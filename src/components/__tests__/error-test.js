jest.dontMock('../error')

describe('Error', function() {
  var Error = require('../error')
  var React = require('react/addons')
  var Test  = React.addons.TestUtils

  it ('returns renders nothing if no error is passed', function() {
    var component = Test.renderIntoDocument(<Error />)
    expect(component.getDOMNode()).toEqual(null)
  })

})
