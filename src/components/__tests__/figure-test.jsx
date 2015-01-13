import Figure from '../figure'

let Test = React.addons.TestUtils

describe('Figure Component', function() {
  let record = { id: 0, url: '/base/test/test.jpg' }

  it ('executes a callback that passes the record id when clicked', function() {
    let callback  = sinon.spy()
    let component = Test.renderIntoDocument(<Figure record={ record } onClick={ callback } />)

    Test.Simulate.click(component.getDOMNode())

    callback.should.have.been.called
  })
})
