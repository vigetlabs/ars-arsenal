/**
 * Selection
 */

import Button from "./ui/button";
import Image from "./ui/image";
import React from "react";

const SHOULD_SELECT = 'Select an image'
const PICK_ANOTHER  = 'Choose another image'

let Selection = React.createClass({

  getPhoto() {
    let { caption, url } = this.props.photo

    return (
      <Image className="ars-selection-photo" alt={ caption } src={ url } />
    )
  },

  render() {
    let hasPhoto = this.props.photo

    return (
      <Button className="ars-selection" onClick={ this._onClick }>
        { hasPhoto && this.getPhoto() }

        <span className="ars-selection-caption">
          { hasPhoto ? PICK_ANOTHER : SHOULD_SELECT }
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
