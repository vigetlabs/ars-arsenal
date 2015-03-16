/**
 * Selection
 */
import Button from "./ui/button"
import SelectionFigure from "./selection-figure"
import React  from "react"
import Record from "../mixins/record"

let Selection = React.createClass({

  mixins: [ Record ],

  getPhoto() {
    let { item } = this.state
    return item ? (<SelectionFigure item={ item } />) : null
  },

  render() {
    return (
      <div className="ars-selection">
        { this.getPhoto() }

        <Button onClick={ this._onClick } className="ars-selection-edit">
          { this.state.item ? 'Pick a different photo' : 'Pick a photo' }
        </Button>
      </div>
    )
  },

  _onClick(e) {
    e.preventDefault()
    this.props.onClick(e)
  }

})

export default Selection
