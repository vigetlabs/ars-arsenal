import Picker from "../picker"
import DOM from 'react-dom'

function makePicker(props = {}) {
  props.onExit   = props.onExit   || () => {}
  props.onChange = props.onChange || () => {}

  return (
    <Picker url="base/test/test.json" { ...props } />
  )
}

describe("Picker", function() {

  describe("when a picker's search input is changed", function() {
    let component = TestUtils.renderIntoDocument(makePicker())
    let search = DOM.findDOMNode(component.refs.search).querySelector('input')

    search.value = 'test'

    TestUtils.Simulate.change(search)

    it ("updates its search state", function() {
      component.state.search.should.equal('test')
    })
  })

  describe("when a picker's gallery has a selection", function() {
    let component = TestUtils.renderIntoDocument(makePicker())

    component.setState({ items: [{ id: 0, caption: 'test', url: '/base/test/test.jpg' }]})

    TestUtils.Simulate.click(DOM.findDOMNode(component.refs.gallery).querySelector('.ars-gallery-item:first-child button'))

    it ("updates its picked state", function() {
      component.state.picked.should.deep.equal([0])
    })
  })

  describe("when a multiselect picker's gallery has a selection", function() {
    let multiselect = true
    let component = TestUtils.renderIntoDocument(makePicker({ multiselect }))

    let clickGalleryItem = function(index) {
      TestUtils.Simulate.click(DOM.findDOMNode(component.refs.gallery).querySelector(`.ars-gallery-item:nth-child(${ index + 1 }) button`));
    };

    component.setState({
      items: [
        { id: 0, caption: 'test', url: '/base/test/test.jpg' },
        { id: 1, caption: 'test', url: '/base/test/test.jpg' }
      ]
    })

    it ("updates its picked state", function() {
      clickGalleryItem(0);
      component.state.picked.should.deep.equal([0])
    })

    it ("adds to its picked state", function() {
      clickGalleryItem(1);
      component.state.picked.should.deep.equal([0, 1])
    })

    it ("removes its picked state", function() {
      clickGalleryItem(1);
      component.state.picked.should.deep.equal([0])
    })
  })

  describe("when a picker's clear selection button is clicked", function() {
    let component = TestUtils.renderIntoDocument(makePicker())

    component.setState({
      items: [
        { id: 0, caption: 'test', url: '/base/test/test.jpg' }
      ],
      picked: [0]
    })

    it ("clears its picked state", function() {
      TestUtils.Simulate.click(DOM.findDOMNode(component.refs.clear))
      component.state.picked.should.deep.equal([])
    })
  })

  describe("when a picker's confirm button is clicked", function() {
    let onExit   = sinon.spy()
    let onChange = sinon.spy()
    let component = TestUtils.renderIntoDocument(makePicker({ onExit, onChange }))

    TestUtils.Simulate.click(DOM.findDOMNode(component.refs.confirm))

    it ("triggers the exit callback", function() {
      onExit.should.have.been.called
    })

    it ("triggers the onChange callback", function() {
      onChange.should.have.been.called
    })

  })

  describe("when a picker's cancel button is clicked", function() {
    let onExit   = sinon.spy()
    let onChange = sinon.spy()
    let component = TestUtils.renderIntoDocument(makePicker({ onExit, onChange }))

    TestUtils.Simulate.click(DOM.findDOMNode(component.refs.cancel))

    it ("triggers the exit callback", function() {
      onExit.should.have.been.called
    })

    it ("does not trigger the onChange callback", function() {
      onChange.should.not.have.been.called
    })

  })

  describe("when a user pushes a key sequence in the gallery", function() {

    describe("and it is cmd+enter", function() {
      let onExit    = sinon.spy()
      let onChange  = sinon.spy()
      let component = TestUtils.renderIntoDocument(makePicker({ onExit, onChange }))

      TestUtils.Simulate.keyDown(DOM.findDOMNode(component.refs.gallery), { key: 'Enter', metaKey: true })

      it ("triggers the exit callback", function() {
        onExit.should.have.been.called
      })

      it ("trigger the onChange callback", function() {
        onChange.should.have.been.called
      })
    })

    describe("and it is ctrl+enter", function() {
      let onExit    = sinon.spy()
      let onChange  = sinon.spy()
      let component = TestUtils.renderIntoDocument(makePicker({ onExit, onChange }))

      TestUtils.Simulate.keyDown(DOM.findDOMNode(component.refs.gallery), { key: 'Enter', ctrlKey: true })

      it ("triggers the exit callback", function() {
        onExit.should.have.been.called
      })

      it ("trigger the onChange callback", function() {
        onChange.should.have.been.called
      })
    })

    describe("and it does not include an option key", function() {
      let onExit    = sinon.spy()
      let onChange  = sinon.spy()
      let component = TestUtils.renderIntoDocument(makePicker({ onExit, onChange }))

      TestUtils.Simulate.keyDown(DOM.findDOMNode(component.refs.gallery), { key: 'Enter' })

      it ("does not trigger the exit callback", function() {
        onExit.should.not.have.been.called
      })

      it ("does not trigger the onChange callback", function() {
        onChange.should.not.have.been.called
      })
    })

    describe("when given an error", function() {
      let component = TestUtils.renderIntoDocument(makePicker())

      before(function(done) {
        component.setState({ error: 'This is a test error'}, () => done())
      })

      it ("displays the error", function() {
        DOM.findDOMNode(component).querySelector('.ars-error').textContent.should.equal('This is a test error')
      })
    })
  })
})
