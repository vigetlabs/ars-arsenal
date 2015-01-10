describe('Search', function() {
  var React  = require('react/addons')
  var Search = require('../search')
  var Test   = React.addons.TestUtils

  it ('triggers a blank search below 2 characters', function() {
    var callback  = sinon.spy()
    var component = Test.renderIntoDocument(<Search onChange={ callback } />)

    Test.Simulate.change(component.refs.input.getDOMNode())

    // remember the change callback is debounced
    setTimeout(function() {
      callback.should.have.been.calledWith('')
    }, Search.INTERVAL)
  })

  it ('triggers the full term above 2 characters', function() {
    var callback  = sinon.spy()
    var component = Test.renderIntoDocument(<Search onChange={ callback } />)
    var input     = component.refs.input.getDOMNode()

    input.value = 'Large Enough'

    Test.Simulate.change(input)

    // remember the change callback is debounced
    setTimeout(function() {
      callback.should.have.been.calledWith('Large Enough');
    }, Search.INTERVAL)
  })

  it ('traps submit events and calls onChange', function() {
    var callback  = sinon.spy()
    var component = Test.renderIntoDocument(<Search onChange={ callback } />)
    var input     = component.refs.input.getDOMNode()

    input.value = 'Large Enough'

    Test.Simulate.submit(component.getDOMNode())

    // remember the change callback is debounced
    setTimeout(function() {
      callback.should.have.been.calledWith('Large Enough');
    }, Search.INTERVAL)
  })

})
