describe('UniqueId Mixin', function() {
  let React    = require('react')
  let UniqueId = require('../uniqueId')

  let Component = React.createClass({
    mixins: [ UniqueId ],
    render: () => (<p />)
  })

  it ("sets the state of a component to a unique identifier", function() {
    let first  = TestUtils.renderIntoDocument(<Component />)
    let second = TestUtils.renderIntoDocument(<Component />)

    first.state.id.should.not.equal(second.state.id)
  })

})
