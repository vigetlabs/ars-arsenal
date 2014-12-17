/**
 * UniqueID
 * Provides a unique identifier for components
 */

var _id = 0

module.exports = {

  getInitialState() {
    return {
      id: 'c' + _id++
    }
  }

}
