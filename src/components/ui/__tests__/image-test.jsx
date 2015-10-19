import Image from '../image'

let Test = React.addons.TestUtils

describe('Image Component', function() {

  it ('sets its state to loaded when it finishes loading', function() {
    let component = Test.renderIntoDocument(<Image src="base/test/test.jpg" />)

    Test.Simulate.load(component.getDOMNode())

    setTimeout(function() {
      component.state.should.have.property('isLoaded', true)
    }, Image.ONLOAD)
  })

  it ('adds an error class on failed images', function() {
    let component = Test.renderIntoDocument(<Image src="fizz.jpg" />)

    Test.Simulate.error(component.getDOMNode())

    component.state.should.have.property('didFail', true)
  })

  it ('resets its loaded state when a new src is received', function() {
    let parentComponent = React.createFactory(React.createClass({
      getInitialState() {
        return {
          url: 'foo.jpg'
        }
      },
      render() {
        return <Image ref="image" src={ this.state.url } />
      }
    }))

    let component = Test.renderIntoDocument(parentComponent())
    let image = component.refs.image

    image.props.src.should.equal('foo.jpg')
    image.state.isLoaded.should.equal(false)

    component.setState({
      isLoaded: true,
      url: 'bar.jpg'
    })

    image.props.src.should.equal('bar.jpg')
    image.state.isLoaded.should.equal(false)
  })
})
