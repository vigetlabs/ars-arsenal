# CHANGELOG

## 3.9.0

- Make `index.js` the main entry point

## 3.8.0

- Merge security updates from dependabot

## 3.7.0

- Disable browser autocomplete when autocomplete feature is disabled

## 3.6.0

- Add autocomplete setting to control autocomplete

## 3.5.1

- Fix bug where yarn output reported to stylesheet (#76)

## 3.5.0

- Update picked state when receiving a new picked value. This allows ArsArsenal
  to be controlled.

## 3.4.0

- Add failure state when data for an image can not be loaded
- Add clear button to selected state
- Updates to UI to support more compact usage
- Improved gallery focus styles
- Inlined icons

## 3.3.1

- Remove exit animation from gallery, which was resulting in an
  undesired visual effect where gallery items flickered into new
  results
- Fix case where searching broke pagination.
- Scroll resets upon search

## 3.3.0

- Safely handle duplicate record entries returned from API responses
- Add `logger` option to customize errors and warnings emitted from
  ArsArsenal
- Add CSS flexbox fix to prevent a single row of gallery items from
  stretching to bottom of container.

## 3.2.4

- Fix an overflow bug in Chrome 72 where gallery items extended past container
- Remove incorrect border on search box in Safari

## 3.2.3

- Do not show ellipsis for nully text values

## 3.2.2

- Fix cases where truncated text broke operating on nully values

## 3.2.1

- New buttons are now typed as "button" to prevent form submission

## 3.2.0

In this release, we've made some updates to improve animations and have introduced the concept of tags.

Tags allow a user to quickly search by a particular term. They can click a tag to pre-populate search
with the given tag.

Additionally, we've added a panel to the gallery view that allows a user to see more information about
a picture without needing to go to the table view.

## 3.1.0

- Update dependencies
- Fixed React key issue where stale content could load along-side
  fresh content, resulting in a key error

## 3.0.0

This release adds pagination to ArsArsenal. In the process of doing this, we've made some breaking changes to the way URLs are constructed. For most users, this upgrade process should be minimal:

### `makeURL` is now `listUrl` and `showUrl`

The old `makeURL` option relied on a null check to determine if the requested url is for a list of items or a single record. To avoid that ambiguity, there are now two endpoints for URL construction:

Instead of:

```javascript
function makeURL(url, id) {
  if (id == null) {
    return url
  } else {
    return `${url}/${id}`
  }
}

ArsArsenal.render({ makeURL })
```

Change this to:

```javascript
let listUrl = url => url
let showUrl = (url, id) => `${url}/${id}`

ArsArsenal.render({ listUrl, showUrl })
```

**These are the default implementations of each option.** We anticipate
that this change affects very few users.

### `makeQuery` is now `listQuery` and returns an object

With pagination, ArsArsenal must now manage multiple query
parameters. For improved ergonomics, ArsArsenal now builds the query
string on behalf of the user. Instead of returning a string, return an object of key/value pairs:

Instead of:

```javascript
function makeQuery(term) {
  return `q=${term}`
}

ArsArsenal.render({ makeQuery })
```

Return an object:

```javascript
const PAGE_SIZE = 10

function listQuery({ page, search, sort }) {
  // Return your pagination/search query implementation:
  let offset = page * PAGE_SIZE
  let limit = offset + PAGE_SIZE

  return { q: search, offset, limit, sort }
}
```

### Sorting

Adding pagination required us to remove client-side
sorting. ArsArsenal can't know all of the records on your server, so
sorting would cause a frustrating reordering of items as new data
loads.

To enable sorting, take advantage of the `sort` field in the
`listQuery` method:

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

## 2.5.1

- Handle `null` in captions and titles

## 2.5.0

- Export project as CommonJS module for better support

## 2.4.5

- Visual updates based on testing in a few apps

## 2.4.4

- Fix bad method reference

## 2.4.3

- Fix another case where indexOf check failed on null selection in the
  TableView

## 2.4.2

- Fix case where indexOf check failed on null selection

## 2.4.1

- Fix a style issue with selection clearing on mobile

## 2.4.0

- Add the ability to what table columns display

## 2.3.0

- Added a table view
- Significant animation and aesthetic improvements

## 2.2.0

- Do not fetch when given a `NaN` slug

## 2.1.1

- Remove PropType to avoid unexpected warning in <SelectionFigure />

## 2.1.0

- Upgrade react-focus-trap dependency

## 2.0.0

- Upgrade dependencies
- Remove peer dependency on React
- Remove deprecation warnings in React 15.x

## 1.0.0

- **Important Update**: This update makes breaking changes to support
  React 0.14. ars-arsenal now takes advantage of
  `react-addons-css-transition-group` and utilizes `react-dom` for rendering.

## 0.4.2

- Adds the ability to clear existing image selections.
- Adds a `resource` option for customizing file type language. For changing the "Photos" reference in "Pick a photo" selection text:

  - Setting `resource` to "File" renders "Pick a file"
  - Setting `resource` to "Image" renders "Pick an image"

- Updates basic selection styles

  - Centers the selection text, re-positions icons to reflect the loading state within the selection button.
  - Adds "Loading" text while a selected image is fetching.
  - Applies the "loaded" class to the image shortly after onload for image-to-image transitions.
  - Adds an explicit `-webkit-transition` to workaround autoprefixr not generating `-webkit-filter` as a transition property.

- Resets `isLoaded` state when the image re-renders with a different src.

## 0.4.1

### Noticeable Changes

- Updated style
- Added multiselection option, see https://github.com/vigetlabs/ars-arsenal/pull/14
- Fixed an issue with Picker `onExit` where "Cancel" clicks could bubble and immediately re-open the Picker dialog

### Upgrading

- The style folder for ars-arsenal is now placed within `ars-arsenal/style`. For those on 0.3.0, you will need to change this path.
