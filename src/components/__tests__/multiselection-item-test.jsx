import MultiSelectionItem from '../multiselection-item'

let Test = React.addons.TestUtils

describe('MultiSelectionItem', function() {

  describe('when given an item', function() {
    it ('renders a photo', function() {
      let component = Test.renderIntoDocument(<MultiSelectionItem url="/base/test/test.json" />)

      component.setState({ item : { url: '/base/test/test.jpg' } })

      component.refs.should.have.property('photo')
    })
  })

  describe('when not given an item', function() {
    it ('does not render a photo', function() {
      let component = Test.renderIntoDocument(<MultiSelectionItem url="/base/test/test.json" />)

      component.refs.should.not.have.property('photo')
    })
  })
})
