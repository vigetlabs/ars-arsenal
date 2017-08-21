/**
 * UniqueID
 * Provides a unique identifier for components
 */

let _id = 0

const UniqueID = {
  getInitialState() {
    return {
      id: 'c' + _id++
    }
  }
}

export default UniqueID
