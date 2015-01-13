import Search from '../search'

let Test = React.addons.TestUtils

describe('Search', function() {

  it ('triggers a blank search below 2 characters', function() {
    let callback  = sinon.spy()
    let component = Test.renderIntoDocument(<Search onChange={ callback } />)

    Test.Simulate.change(component.refs.input.getDOMNode())

    // remember the change callback is debounced
    setTimeout(function() {
      callback.should.have.been.calledWith('')
    }, Search.INTERVAL)
  })

  it ('triggers the full term above 2 characters', function() {
    let callback  = sinon.spy()
    let component = Test.renderIntoDocument(<Search onChange={ callback } />)
    let input     = component.refs.input.getDOMNode()

    input.value = 'Large Enough'

    Test.Simulate.change(input)

    // remember the change callback is debounced
    setTimeout(function() {
      callback.should.have.been.calledWith('Large Enough');
    }, Search.INTERVAL)
  })

  it ('traps submit events and calls onChange', function() {
    let callback  = sinon.spy()
    let component = Test.renderIntoDocument(<Search onChange={ callback } />)
    let input     = component.refs.input.getDOMNode()

    input.value = 'Large Enough'

    Test.Simulate.submit(component.getDOMNode())

    // remember the change callback is debounced
    setTimeout(function() {
      callback.should.have.been.calledWith('Large Enough');
    }, Search.INTERVAL)
  })

  it ('clears search on escape', function() {
    let callback  = sinon.spy()
    let component = Test.renderIntoDocument(<Search onChange={ callback } />)
    let input     = component.refs.input.getDOMNode()

    input.value = 'Large Enough'

    Test.Simulate.keyUp(input, { key: 'Escape' })

    // remember the change callback is debounced
    setTimeout(function() {
      callback.should.have.been.calledWith('');
    }, Search.INTERVAL)
  })
})
