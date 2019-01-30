import selectionText from '../selection-text'

let item = {}
let fetching = true
let isPlural = true

describe('selectionText', () => {
  describe('when the selection is empty', () => {
    let text = selectionText({})

    test('has the correct text', () => {
      expect(text).toBe('Pick a photo')
    })
  })

  describe('when the selection is not empty', () => {
    let text = selectionText({ item })

    test('has the correct text', () => {
      expect(text).toBe('Pick a different photo')
    })
  })

  describe('when the selection is loading', () => {
    let text = selectionText({ fetching })

    test('has the correct text', () => {
      expect(text).toBe('Loading photo')
    })
  })

  describe('when the selection is empty and the resource is plural', () => {
    let text = selectionText({ isPlural })

    test('has the correct text', () => {
      expect(text).toBe('Pick photos')
    })
  })

  describe('when the selection is not empty and the resource is plural', () => {
    let text = selectionText({ isPlural, item })

    test('has the correct text', () => {
      expect(text).toBe('Pick different photos')
    })
  })
})
