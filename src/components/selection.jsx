/**
 * Selection
 */
import Button from "./ui/button"
import Image  from "./ui/image"
import React  from "react"
import Record from "../mixins/record"

let Selection = React.createClass({

  mixins: [ Record ],

  getPhoto() {
    let { item } = this.state

    return item ? (
      <Image className="ars-selection-photo" ref="photo" alt={ item.caption } src={ item.url } />
    ) : null
  },

  render() {
    return (
      <Button className="ars-selection" onClick={ this._onClick }>
        { this.getPhoto() }
        <span className="ars-selection-caption">Select an image</span>
      </Button>
    )
  },

  _onClick(e) {
    e.preventDefault()
    this.props.onClick(e)
  }

})

export default Selection
