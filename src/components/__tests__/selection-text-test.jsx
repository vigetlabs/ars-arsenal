import SelectionText from '../selection-text'

let Test     = React.addons.TestUtils
let item     = {}
let fetching = true
let isPlural = true

function makeComponent(props = {}) {
  props.resource = props.resource || 'Image'

  return (
    <SelectionText { ...props } />
  )
}

describe('SelectionText', function() {

  describe('when the selection is empty', function() {
    let component = Test.renderIntoDocument(makeComponent())

    it ('has the correct text', function() {
      expect(component.getDOMNode().textContent).to.equal('Pick an image')
    })
  })

  describe('when the selection is not empty', function() {
    let component = Test.renderIntoDocument(makeComponent({ item }))

    it ('has the correct text', function() {
      expect(component.getDOMNode().textContent).to.equal('Pick a different image')
    })
  })

  describe('when the selection is loading', function() {
    let component = Test.renderIntoDocument(makeComponent({ fetching }))

    it ('has the correct text', function() {
      expect(component.getDOMNode().textContent).to.equal('Loading image')
    })
  })

  describe('when the selection is empty and the resource is plural', function() {
    let component = Test.renderIntoDocument(makeComponent({ isPlural }))

    it ('has the correct text', function() {
      expect(component.getDOMNode().textContent).to.equal('Pick images')
    })
  })

  describe('when the selection is not empty and the resource is plural', function() {
    let component = Test.renderIntoDocument(makeComponent({ isPlural, item }))

    it ('has the correct text', function() {
      expect(component.getDOMNode().textContent).to.equal('Pick different images')
    })
  })

})
