import SelectionText from '../selection-text'
import DOM from 'react-dom'

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
    let component = TestUtils.renderIntoDocument(makeComponent())

    it ('has the correct text', function() {
      expect(DOM.findDOMNode(component).textContent).to.equal('Pick an image')
    })
  })

  describe('when the selection is not empty', function() {
    let component = TestUtils.renderIntoDocument(makeComponent({ item }))

    it ('has the correct text', function() {
      expect(DOM.findDOMNode(component).textContent).to.equal('Pick a different image')
    })
  })

  describe('when the selection is loading', function() {
    let component = TestUtils.renderIntoDocument(makeComponent({ fetching }))

    it ('has the correct text', function() {
      expect(DOM.findDOMNode(component).textContent).to.equal('Loading image')
    })
  })

  describe('when the selection is empty and the resource is plural', function() {
    let component = TestUtils.renderIntoDocument(makeComponent({ isPlural }))

    it ('has the correct text', function() {
      expect(DOM.findDOMNode(component).textContent).to.equal('Pick images')
    })
  })

  describe('when the selection is not empty and the resource is plural', function() {
    let component = TestUtils.renderIntoDocument(makeComponent({ isPlural, item }))

    it ('has the correct text', function() {
      expect(DOM.findDOMNode(component).textContent).to.equal('Pick different images')
    })
  })

})
