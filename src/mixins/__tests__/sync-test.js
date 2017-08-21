import Sync from '../sync'

describe('Sync Mixin', () => {
  test('has a default onFetch method', () => {
    let onFetch = Sync.getDefaultProps().onFetch

    expect(onFetch('success')).toBe('success')
  })

  test('has a default onError method', () => {
    let onError = Sync.getDefaultProps().onError

    expect(onError('error')).toBe('error')
  })

  describe('makeUrl', () => {
    test('returns a url when no slug is given', () => {
      let makeURL = Sync.getDefaultProps().makeURL

      expect(makeURL('route')).toBe('route')
    })

    test('appends a slug when provided', () => {
      let makeURL = Sync.getDefaultProps().makeURL

      expect(makeURL('route', 'fiz')).toBe('route/fiz')
    })
  })

  describe('makeQuery', () => {
    test('constructs a query given a term', () => {
      let makeQuery = Sync.getDefaultProps().makeQuery

      expect(makeQuery('term')).toBe('q=term')
    })
  })

  describe('syncProps', () => {
    test('returns a set list of properties related to syncing', () => {
      let props = {
        makeURL: true,
        makeQuery: true,
        onError: true,
        onFetch: true,
        url: true
      }

      let result = Sync.syncProps.call({ props })

      expect(result).toHaveProperty('makeURL', props.makeURL)
      expect(result).toHaveProperty('makeQuery', props.makeQuery)
      expect(result).toHaveProperty('onError', props.onError)
      expect(result).toHaveProperty('onFetch', props.onFetch)
      expect(result).toHaveProperty('url', props.url)
    })
  })
})
