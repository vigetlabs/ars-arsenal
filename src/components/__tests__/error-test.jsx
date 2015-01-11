describe('Error', function() {
  import Error from '../error'
  import React from 'react/addons'

  let Test = React.addons.TestUtils

  describe('when given an error', function() {

    it ('renders an error if provided an error prop', function() {
      let component = Test.renderIntoDocument(<Error error='test' />)
      expect(component.getDOMNode().textContent).to.equal('test')
    })

    it ('returns renders nothing if no error is passed', function() {
      let component = Test.renderIntoDocument(<Error />)
      expect(component.getDOMNode()).to.equal(null)
    })
  })

})
