describe("Ars", function() {
  import Ars from "../ars"
  import React from "react/addons"

  let Test = React.addons.TestUtils

  describe ("when given an onChange handler", function() {

    describe("when a gallery item is picked and an onChange event is provided", function() {
      let mock = sinon.spy()
      let component = Test.renderIntoDocument(<Ars url="/test/test.json" onChange={ mock } />)

      component._onGalleryPicked("slug")

      it ("sets the `picked` state to the chosen slug", function() {
        component.state.should.have.property("picked", "slug")
      })

      it ("calls the onChange event with the picked state", function() {
        mock.should.have.been.calledWith(component.state.picked)
      })

    })

  })

  describe("when the component's selection button is clicked", function() {
    let component = Test.renderIntoDocument(<Ars url="/test/test.json"  />)

    Test.Simulate.click(component.refs.selection.getDOMNode())

    it ("should set the dialogOpen state to true", function() {
      component.state.should.have.property('dialogOpen', true)
    })

  })

  describe("when the component's dialogOpen state is true", function() {
    import Picker from "../picker"

    let component = Test.renderIntoDocument(<Ars url="/test/test.json" />)

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
