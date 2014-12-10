/**
 * Focus
 *
 * For accessibility, this mixin focuses on mount and returns focus
 * when it is unmounted
 */

module.exports = {

  pushFocus() {
    this.setState({
      previousFocus: document.activeElement
    })

    this.getDOMNode().focus()
  },

  popFocus() {
    if (this.state.previousFocus) {
      this.state.previousFocus.focus()
    }
  },

  componentDidMount() {
    this.pushFocus()
  },

  componentWillUnmount() {
    this.popFocus()
  }

}
