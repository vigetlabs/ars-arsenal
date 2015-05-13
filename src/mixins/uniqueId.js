/**
 * UniqueID
 * Provides a unique identifier for components
 */

let _id = 0

module.exports = {

  getInitialState() {
    return {
      id: 'c' + _id++
    }
  }

}
