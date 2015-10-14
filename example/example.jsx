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
ArsArsenal.render(selectWithValue, Object.assign({ picked: [1]}, options));

options.multiselect = true;
ArsArsenal.render(multiselect, options);
ArsArsenal.render(multiselectWithValue, Object.assign({ picked: [2,3]}, options));
