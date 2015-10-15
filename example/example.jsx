let ArsArsenal = require('../src/index')

require('./style')

let onSingleChange = function(object) {
  alert("You selected " + object.name)
  console.log("Value changed to %s", object.id);
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

  onChange(ids, objects) {
    if (Array.isArray(objects)) {
      return objects.forEach(onSingleChange)
    }

    onSingleChange(objects)
  }
}

ArsArsenal.render(select, options);

options.multiselect = true;
ArsArsenal.render(multiselect, options);
