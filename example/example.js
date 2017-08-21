import './style'
import ArsArsenal from '../src/index'

let options = {
  url: `http://${window.location.hostname}:7654/photos`,

  makeQuery(term) {
    return `term=${term}`
  },

  onError(response) {
    return `${response.code}: ${response.message}`
  },

  onChange(value) {
    console.log('Value changed to %s', value)
  }
}

let select = document.querySelector('#select')
let selectWithValue = document.querySelector('#selectWithValue')
let multiselect = document.querySelector('multiselect')
let multiselectWithValue = document.querySelector('multiselectWithValue')

ArsArsenal.render(select, options)
ArsArsenal.render(selectWithValue, Object.assign({ picked: [1] }, options))

ArsArsenal.render(multiselect, { ...options, multiselect: true })
ArsArsenal.render(multiselectWithValue, {
  ...options,
  picked: [2, 3],
  multiselect: true
})
