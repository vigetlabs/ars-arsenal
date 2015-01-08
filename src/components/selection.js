/**
 * Selection
 */
import Button from "./ui/button"
import Image  from "./ui/image"
import React  from "react"
import Record from "../mixins/record"

let Selection = React.createClass({

  mixins: [ Record ],

  statics: {
    PICK_ANOTHER  : "Choose another image",
    SHOULD_SELECT : "Select an image"
  },

  getPhoto() {
    let { caption, url } = this.state.item

    return (
      <Image className="ars-selection-photo" alt={ caption } src={ url } />
    )
  },

  render() {
    let hasPhoto = !!this.state.item

    return (
      <Button className="ars-selection" onClick={ this._onClick }>
        { hasPhoto && this.getPhoto() }

        <span className="ars-selection-caption">
          { hasPhoto ? Selection.PICK_ANOTHER : Selection.SHOULD_SELECT }
        </span>
      </Button>
    )
  },

  _onClick(e) {
    e.preventDefault()
    this.props.onClick(e)
  }

})

export default Selection
