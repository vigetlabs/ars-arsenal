describe("Picker", function() {
  import Picker from "../picker"
  import React from "react/addons"

  let Test = React.addons.TestUtils

  describe("when a picker's confirm button is clicked", function() {
    let onExit   = sinon.spy()
    let onChange = sinon.spy()
    let component = Test.renderIntoDocument(<Picker url="base/test/test.json" onExit={ onExit } onChange={ onChange } />)

    Test.Simulate.click(component.refs.confirm.getDOMNode())

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
    let component = Test.renderIntoDocument(<Picker url="base/test/test.json" onExit={ onExit } onChange={ onChange } />)

    Test.Simulate.click(component.refs.cancel.getDOMNode())

    it ("triggers the exit callback", function() {
      onExit.should.have.been.called
    })

    it ("does not trigger the onChange callback", function() {
      onChange.should.not.have.been.called
    })

  })

  describe("when a user pushes a key sequence in the gallery", function() {

    describe("and the key sequence is cmd+enter", function() {
      let onExit    = sinon.spy()
      let onChange  = sinon.spy()
      let component = Test.renderIntoDocument(<Picker url="base/test/test.json" onExit={ onExit } onChange={ onChange } />)

      Test.Simulate.keyDown(component.refs.gallery.getDOMNode(), { key: 'Enter', metaKey: true })

      it ("triggers the exit callback", function() {
        onExit.should.have.been.called
      })

      it ("trigger the onChange callback", function() {
        onChange.should.have.been.called
      })
    })

    describe("and the key sequence is ctrl+enter", function() {
      let onExit    = sinon.spy()
      let onChange  = sinon.spy()
      let component = Test.renderIntoDocument(<Picker url="base/test/test.json" onExit={ onExit } onChange={ onChange } />)

      Test.Simulate.keyDown(component.refs.gallery.getDOMNode(), { key: 'Enter', ctrlKey: true })

      it ("triggers the exit callback", function() {
        onExit.should.have.been.called
      })

      it ("trigger the onChange callback", function() {
        onChange.should.have.been.called
      })
    })

    describe("and the key sequence does not include an option key", function() {
      let onExit    = sinon.spy()
      let onChange  = sinon.spy()
      let component = Test.renderIntoDocument(<Picker url="base/test/test.json" onExit={ onExit } onChange={ onChange } />)

      Test.Simulate.keyDown(component.refs.gallery.getDOMNode(), { key: 'Enter' })

      it ("does not trigger the exit callback", function() {
        onExit.should.not.have.been.called
      })

      it ("does not trigger the onChange callback", function() {
        onChange.should.not.have.been.called
      })
    })

    describe("when given an error", function() {
      let onExit    = sinon.spy()
      let onChange  = sinon.spy()
      let component = Test.renderIntoDocument(<Picker url="base/test/test.json" onExit={ onExit } onChange={ onChange } />)

      before(function(done) {
        component.setState({ error: 'This is a test error'}, () => done())
      })

      it ("displays the error", function() {
        component.getDOMNode().querySelector('.ars-error').textContent.should.equal('This is a test error')
      })
    })

  })
})
