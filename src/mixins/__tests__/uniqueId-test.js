describe('UniqueId Mixin', function() {
  let React    = require('react/addons')
  let Test     = React.addons.TestUtils
  let UniqueId = require('../uniqueId')

  let Component = React.createClass({
    mixins: [ UniqueId ],
    render: () => (<p />)
  })

  it ("sets the state of a component to a unique identifier", function() {
    let first  = Test.renderIntoDocument(<Component />)
    let second = Test.renderIntoDocument(<Component />)

    first.state.id.should.not.equal(second.state.id)
  })

})
