/**
 * Figure
 * An individual gallery tile
 */

import Image from './ui/image';
import React from 'react/addons';

let Types = React.PropTypes
let cx    = React.addons.classSet

let Figure = React.createClass({

  propTypes: {
    record  : Types.object.isRequired,
    onClick : Types.func.isRequired,
    picked  : Types.bool
  },

  render() {
    let { record, picked } = this.props

    let className = cx({
      'ars-fig'        : true,
      'ars-fig-picked' : picked
    })

    return (
      <button className={ className } onClick={ this._onClick }>
        <Image className="ars-fig-img" src={ record.url } />

        <span className="ars-fig-caption">
          { record.caption }
        </span>
      </button>
    )
  },

  _onClick(e) {
    e.preventDefault()
    this.props.onClick(this.props.record.id)
  }

})

export default Figure
