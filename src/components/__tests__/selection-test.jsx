describe('Selection', function() {
  import Selection from '../selection'
  import React from 'react/addons'

  let Test = React.addons.TestUtils

  describe('when given an item', function() {
    it ('renders a photo', function() {
      let component = Test.renderIntoDocument(<Selection />)

      component.setState({ item : { url: '/base/test/test.jpg' } })

      component.refs.should.have.property('photo')
    })
  })

  describe('when not given an item', function() {
    it ('does not render a photo', function() {
      let component = Test.renderIntoDocument(<Selection />)

      component.refs.should.not.have.property('photo')
    })
  })

})
