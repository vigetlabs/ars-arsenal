/**
 * Selection Figure
 */

let Image = require("./ui/image")
let React = require("react")

let SelectionFigure = React.createClass({

  getDefaultProps() {
    return {
      caption : '',
      title   : ''
    }
  },

  getTitle(title='') {
    let trimmed = title.trim()
    return trimmed.length ? (<p ref="title" className="ars-selection-title">{ trimmed }</p>) : null
  },

  getCaption(caption='') {
    let trimmed = caption.trim()
    return trimmed.length ? (<p ref="caption" className="ars-selection-caption">{ trimmed }</p>) : null
  },

  render() {
    let { caption, name, url } = this.props.item

    return (
      <figure className="ars-selection-figure">
        <Image className="ars-selection-photo" alt={ caption } src={ url } />
        <figcaption className="ars-selection-desc">
          { this.getTitle(name) }
          { this.getCaption(caption) }
        </figcaption>
      </figure>
    )
  }

})

module.exports = SelectionFigure
