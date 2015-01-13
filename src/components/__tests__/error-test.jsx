import Error from '../error'

let Test = React.addons.TestUtils

describe('Error', function() {

  describe('when given an error', function() {
    it ('renders', function() {
      let component = Test.renderIntoDocument(<Error error='test' />)
      expect(component.getDOMNode().textContent).to.equal('test')
    })
  })

  describe('when not given an error', function() {
    it ('renders nothing', function() {
      let component = Test.renderIntoDocument(<Error />)
      expect(component.getDOMNode()).to.equal(null)
    })
  })

})
