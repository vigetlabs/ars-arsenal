/**
 * UniqueID
 * Provides a unique identifier for components
 */

let _id = 0

export default {

  getInitialState() {
    return {
      id: 'c' + _id++
    }
  }

}
