import MultiSelection from '../multiselection'

let Test = React.addons.TestUtils

describe('MultiSelection', function() {

  describe('when given photos', function() {
    let component = Test.renderIntoDocument(<MultiSelection slug={ [0, 1] } url="/base/test/test.json" resource="Photo" />)

    it ('renders photos', function() {
      component.getDOMNode().querySelector('.ars-multiselection-grid').should.exist
    })
  })

  describe('when not given photos', function() {
    let component = Test.renderIntoDocument(<MultiSelection slug={ [] } url="/base/test/test.json" resource="Photo" />)

    it ('does not render photos', function() {
      (component.getDOMNode().querySelector('.ars-multiselection-grid') === null).should.be.true
    })
  })
})
