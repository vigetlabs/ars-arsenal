import './style'
import ArsArsenal from '../src/index'

ArsArsenal.render(app, {

  url: 'http://localhost:7000/photos',

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
