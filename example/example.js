let React      = require('react/addons');
let ArsArsenal = require('../src/index');

ArsArsenal.render(app, {

  url: 'http://localhost:7000/photos',

  onError(response) {
    return `${ response.code }: ${ response.message }`;
  },

  onChange(value) {
    console.log("Value changed to %s", value);
  }

});
