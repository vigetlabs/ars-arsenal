describe('Figure Component', function() {
  var Figure = require('../figure')
  var React  = require('react/addons')
  var Test   = React.addons.TestUtils

  var record = { id: 0, url: '/base/test/test.jpg' }

  it ('executes a callback that passes the record id when clicked', function() {
    var callback  = sinon.spy()
    var component = Test.renderIntoDocument(<Figure record={ record } onClick={ callback } />)

    Test.Simulate.click(component.getDOMNode())

    callback.should.have.been.called
  })

})
