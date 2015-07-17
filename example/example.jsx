let ArsArsenal = require('../src/index')

require('./style')

let options = {
  url: `http://${ window.location.hostname }:7654/photos`,

  makeQuery(term) {
    return `term=${ term }`
  },

  onError(response) {
    return `${ response.code }: ${ response.message }`;
  },

  onChange(value) {
    console.log("Value changed to %s", value);
  }
}

ArsArsenal.render(select, options);

options.multiselect = true;
ArsArsenal.render(multiselect, options);
