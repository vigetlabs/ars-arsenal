import Error from '../error'
import DOM   from 'react-dom'

describe('Error', function() {

  describe('when given an error', function() {
    it ('renders', function() {
      let component = TestUtils.renderIntoDocument(<Error error='test' />)
      expect(DOM.findDOMNode(component).textContent).to.equal('test')
    })
  })

  describe('when not given an error', function() {
    it ('renders nothing', function() {
      let component = TestUtils.renderIntoDocument(<Error />)
      expect(DOM.findDOMNode(component)).to.equal(null)
    })
  })

})
