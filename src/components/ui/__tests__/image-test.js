describe('Image Component', function() {
  let Image  = require('../image')
  let React  = require('react/addons')
  let Test   = React.addons.TestUtils

  it ('executes an onLoad callback when it finishes loading', function(done) {
    let callback  = function() {
      component.state.should.have.property('isLoaded', true)
      done()
    }
    let component = Test.renderIntoDocument(<Image src="base/test/test.jpg" onLoad={ callback } />)

    Test.Simulate.load(component.getDOMNode())
  })

})
