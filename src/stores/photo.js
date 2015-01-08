/**
 * Photo
 * The resource responsible for fetching and managing operations related to
 * the API endpoint for images.
 */

import xhr from 'xhr'

let Photo = {

  fetch(url, success, error) {
    let request = xhr({ url, json: true }, function(err, response, body) {
      err ? error(err) : success(body)
    })

    return request
  }

}

export default Photo
