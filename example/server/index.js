import Url from 'url'
import photos from './photos.json'

export default function(url, success, error) {
  const { pathname, query } = Url.parse(url, true)

  const timeout = setTimeout(function() {
    let [_base, id] = pathname.match(/api\/photos\/(.+?)/) || []

    if (id) {
      show(id, query, success, error)
    } else {
      index(query, success, error)
    }
  }, 10)

  return {
    abort() {
      clearTimeout(timeout)
    }
  }
}

function index(query, success, error) {
  let payload = photos

  if ('term' in query) {
    let term = new RegExp(escape(query.term), 'i')

    payload = photos.filter(function(photo) {
      return term.test(photo.name)
    })
  }

  success(payload)
}

function show(id, query, success, error) {
  let payload = photos.find(photo => `${photo.id}` === `${id}`)
  payload ? success(payload) : error({ code: 404, message: 'Not found' })
}
