import './style'

import ArsArsenal from '../src/index'

ArsArsenal.render(app, {

  url: 'http://' + window.location.hostname +':7000/photos',

  makeQuery(term) {
    return `term=${ term }`
  },

  onError(response) {
    return `${ response.code }: ${ response.message }`;
  },

  onChange(value) {
    console.log("Value changed to %s", value);
  }

})
