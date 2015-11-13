import Ars    from "../ars"
import Picker from "../picker"
import DOM    from 'react-dom'

let makeComponent = function(props) {
  return (
    <Ars url="/base/test/test.json" { ...props } />
  )
}

describe("Ars", function() {

  describe("when the component renders", function() {
    let onChange  = sinon.spy()
    let picked = 9
    let component = TestUtils.renderIntoDocument(makeComponent({ onChange, picked }))

    it ("has a selection component", function() {
      component.refs.should.have.property("selection")
    })

    it ("migrates a single `picked` value to an array", function() {
      component.state.should.have.property("picked").that.deep.equals([picked])
    })
  })

  describe("when the component renders with the multiselect option", function() {
    let onChange  = sinon.spy()
    let multiselect = true
    let component = TestUtils.renderIntoDocument(makeComponent({ onChange, multiselect }))

    it ("has a multiselection component", function() {
      component.refs.should.have.property("multiselection")
    })

    describe("and a gallery item is picked", function() {
      let picked = [9, 12]
      component._onGalleryPicked(picked)

      it ("sets the `picked` state to an array of chosen values", function() {
        component.state.should.have.property("picked").that.deep.equals(picked)
      })

      it ("calls the onChange event with the picked state", function() {
        onChange.should.have.been.calledWith(component.state.picked)
      })
    })
  })

  describe("when a gallery item is picked", function() {

    describe("and an onChange handler is provided", function() {
      let onChange  = sinon.spy()
      let component = TestUtils.renderIntoDocument(makeComponent({ onChange }))
      let picked = [9]

      component._onGalleryPicked(picked)

      it ("sets the `picked` state to an array of chosen values", function() {
        component.state.should.have.property("picked").that.deep.equals(picked)
      })

      it ("calls the onChange event with the first item in the picked state", function() {
        onChange.should.have.been.calledWith(component.state.picked[0])
      })
    })

    describe("and an onChange handler is not provided", function() {
      let component = TestUtils.renderIntoDocument(makeComponent())

      component._onGalleryPicked("slug")

      it ("sets the `picked` state to the chosen slug", function() {
        component.state.should.have.property("picked", "slug")
      })
    })
  })

  describe("when the component's selection button is clicked", function() {
    let component = TestUtils.renderIntoDocument(makeComponent())

    TestUtils.Simulate.click(DOM.findDOMNode(component.refs.selection.refs.button))

    it ("should set the dialogOpen state to true", function() {
      component.state.should.have.property('dialogOpen', true)
    })

  })

  describe("when the component's multiselection button is clicked", function() {
    let multiselect = true
    let component = TestUtils.renderIntoDocument(makeComponent({ multiselect }))

    TestUtils.Simulate.click(DOM.findDOMNode(component.refs.multiselection.refs.button))

    it ("should set the dialogOpen state to true", function() {
      component.state.should.have.property('dialogOpen', true)
    })
  })

  describe("when the component's dialogOpen state is true", function() {


    let component = TestUtils.renderIntoDocument(makeComponent())

    beforeEach(function(done) {
      component.setState({ dialogOpen: true }, () => done())
    })

    it ("renders a picker component", function() {
      component.refs.should.have.property("picker")
    })

    describe("when the picker exits", function() {
      var spy = sinon.spy(component, 'setState')

      component._onExit()

      it ("sets the dialogOpen state to false", function() {
        spy.should.have.been.calledWith({ dialogOpen: false })
      })

      after(function() {
        spy.restore()
      })
    })
  })
})
