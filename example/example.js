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
let selectTable = document.querySelector('#select-table')
let selectWithValue = document.querySelector('#selectWithValue')
let multiselect = document.querySelector('#multiselect')
let multiselectTable = document.querySelector('#multiselect-table')
let multiselectWithValue = document.querySelector('#multiselectWithValue')

ArsArsenal.render(select, options)
ArsArsenal.render(selectTable, { ...options, mode: 'table' })
ArsArsenal.render(selectWithValue, { ...options, picked: [1] })

ArsArsenal.render(multiselect, { ...options, multiselect: true })
ArsArsenal.render(multiselectTable, {
  ...options,
  multiselect: true,
  mode: 'table'
})
ArsArsenal.render(multiselectWithValue, {
  ...options,
  picked: [2, 3],
  multiselect: true
})
