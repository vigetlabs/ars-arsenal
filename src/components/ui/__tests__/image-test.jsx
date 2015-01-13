import Image from '../image'

let Test = React.addons.TestUtils

describe('Image Component', function() {

  it ('sets its state to loaded when it finishes loading', function() {
    let component = Test.renderIntoDocument(<Image src="base/test/test.jpg" />)

    Test.Simulate.load(component.getDOMNode())

    component.state.should.have.property('isLoaded', true)
  })
})
