# CHANGELOG

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
