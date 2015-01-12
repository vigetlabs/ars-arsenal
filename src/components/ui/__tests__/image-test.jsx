describe('Image Component', function() {
  let Image  = require('../image')
  let React  = require('react/addons')
  let Test   = React.addons.TestUtils

  it ('sets its state to loaded when it finishes loading', function() {
    let component = Test.renderIntoDocument(<Image src="base/test/test.jpg" />)

    Test.Simulate.load(component.getDOMNode())
    component.state.should.have.property('isLoaded', true)
  })

})
