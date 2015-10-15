let ArsArsenal = require('../src/index')

require('./style')

let onSingleChange = function(value) {
  alert("You selected " + value.name)
  console.log("Value changed to %s", value.id);
}

let options = {
  picked    : 1,
  url: `http://${ window.location.hostname }:7654/photos`,
  makeQuery(term) {
    return `term=${ term }`
  },

  onError(response) {
    return `${ response.code }: ${ response.message }`;
  },

  onChange(value) {
    if (Array.isArray(value)) {
      return value.forEach(onSingleChange)
    }

    onSingleChange(value)
  }
}

ArsArsenal.render(select, options);

options.multiselect = true;
ArsArsenal.render(multiselect, options);
