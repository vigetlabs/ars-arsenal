# Ars Arsenal

[![CircleCI](https://circleci.com/gh/vigetlabs/ars-arsenal.svg?style=svg)](https://circleci.com/gh/vigetlabs/ars-arsenal)

A gallery picker. ArsArsenal makes it easy to quickly select photos and other resources for content management purposes. Additionally, it supports features such as:

- Table/Gallery view
- Pagination
- Sorting
- Search

**Heads up!** we recently made some breaking changes to configuration in version 3.0.0. See the [CHANGELOG](CHANGELOG.md) for more information.

![Example](./screenshots/two-up.png)

## Installation

```shell
npm install --save ars-arsenal
# or use yarn
yarn add ars-arsenal
```

### Styles

Ars Arsenal ships with a stylesheet. The easiest way to include it is by importing it from the node_modules folder:

```scss
/* Sass stylesheet: */
@import './node_modules/ars-arsenal/style/ars-arsenal.scss'; /* or CSS: */
@import './node_modules/ars-arsenal/style.css';
```

### Icons

Copy over icons from `./example/public/icons` to your public directory.

## Usage

ArsArsenal can be rendered either as a stand-alone instance or as a React component:

### Stand Alone

```javascript
import ArsArsenal from 'ars-arsenal'

let app = document.getElementById('app')

ArsArsenal.render(app, {
  resource: 'photo', // the noun used for selection, i.e. "Pick a photo"

  // Configure the root element's HTML attributes. default = {}
  rootAttributes: {
    className: 'my-custom-class another-custom-class',
    'data-test': 'my-integration-selector-helper'
  },

  // The base URL for API interaction
  url: 'photo/resource/endpoint',

  // How to display the items. Can be "table" or "gallery"
  mode: 'gallery',

  // What table columns to display, and in what order
  columns: ['id', 'name', 'caption', 'attribution', 'preview'],

  multiselect: false,

  listUrl: function(url) {
    // Used to build the URL that fetches lists of records.
    return url
  },

  listQuery: function({ search, page, sort }) {
    // Use this function to rename query parameters before building
    // the listUrl URL
    //
    // Any data returned from this function will be stringified into
    // query parameters
    return { search, page, sort }
  },

  showUrl: function(url, id: ID) {
    // Used to build the URL that fetches a single record
    return `${url}/${id}`
  },

  onError: function(response) {
    // format errors before they are sent as a "string" value
    // to the component
    return response.code + ': ' + response.message
  },

  onFetch: function(response) {
    // format the response, useful if you do not control the JSON
    // response from your endpoint
    return response.data
  },

  onChange: function(id) {
    // Whenever a new item is picked, this event is triggered
    console.log('The value was changed to %s', id)
  },

  request: function(url, callback) {
    // Behavior to configure networking. Return an XMLHTTPRequest
    return xhr(url, callback)
  },

  logger: function(level, message) {
    // Override this method to handle usage warnings and issues
    // ArsArsenal considers errors with API interaction. Useful
    // for monitoring.
    switch (level) {
      case 'warning':
        console.warn(message)
        break
      case 'error':
        console.error(message)
        break
      default:
        console.log(message)
        break
    }
  }
})
```

### React

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Ars } from 'ars-arsenal'

let app = document.getElementById('app')

let options = {
  /* same options as above */
}

ReactDOM.render(<Ars options={options} />, app)
```

## Response format

APIs return different shapes of data. To account for this, ArsArsenal exposes the `onFetch` option. This option is called whenever data is fetched from your API:

```javascript
let options = {
  onFetch: function(response) {
    // format the response, useful if you do not control the JSON
    // response from your endpoint
    return response.data
  }
}
```

ArsArsenal expects the following data format:

```json
[
  {
    "id": 1,
    "attribution": "League of Legends",
    "name": "Alistar",
    "caption": "Lorem ipsum dolor sit amet",
    "url": "images/alistar.jpg",
    "tags": ["blue", "cunning"]
  }
  //...
]
```

To transpose data, map over it in `onFetch` like so:

```javascript
let options = {
  onFetch: function(response) {
    return response.data.map(function(record) {
      return {
        id: record.id,
        attribution: record.credit,
        name: record.title,
        caption: record.caption,
        url: record.imageSrc,
        tags: record.tags
      }
    })
  }
}
```

## Sorting

To enable sorting, take advantage of the `sort` field passed into the `listQuery` option. `listQuery` will automatically stringify the returned object:

```javascript
function listQuery({ page, search, sort }) {
  // Assuming your API requires a call like:
  // /photos?page=1&q=Dogs&sortKey=breed
  return {
    page: page,
    q: search,
    sortKey: sort
  }
}
```

## Contributing

Take a look at our [contributing guide](./CONTRIBUTING.md), but the gist of it is:

```shell
# Install dependencies
yarn install
# Spin up the example server with:
yarn start
```

---

<a href="http://code.viget.com">
  <img src="http://code.viget.com/github-banner.png" alt="Code At Viget">
</a>

Visit [code.viget.com](http://code.viget.com) to see more projects from [Viget.](https://viget.com)
