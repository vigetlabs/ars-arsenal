jest.dontMock('../figure')

describe('Figure', function() {
  var Figure = require('../figure')
  var React  = require('react/addons')
  var Test   = React.addons.TestUtils

  var record = { id: 0, url: 'null.jpg' }

  it ('executes a callback that passes the record id when clicked', function() {
    var callback  = jest.genMockFunction()
    var component = Test.renderIntoDocument(<Figure record={ record } onClick={ callback } />)

    Test.Simulate.click(component.getDOMNode())

    expect(callback).lastCalledWith(record.id)
  })

})
