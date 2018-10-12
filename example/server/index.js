import Url from 'url'
import data from './photos.json'

const photos = []

var id = 0
for (var i = 0; i < 20; i++) {
  data.forEach(item => {
    photos.push({ ...item, id: id++ })
  })
}

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

  if ('offset' in query || 'limit' in query) {
    let offset = parseInt(query.offset || 0)
    let limit = parseInt(query.limit || 10)

    payload = payload.slice(offset, offset + limit)

    console.log('Fetching %s %s', offset, offset + limit)
  }

  success(payload)
}

function show(id, query, success, error) {
  let payload = photos.find(photo => `${photo.id}` === `${id}`)
  payload ? success(payload) : error({ code: 404, message: 'Not found' })
}
