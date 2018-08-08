/**
 * @flow
 */

import xhr from 'xhr'

export function request(url: string, success: *, error: *): XMLHttpRequest {
  return xhr({ url, json: true }, (err: ?Error, response: *, body: *) => {
    if (err) {
      error(err)
    } else if (response.statusCode >= 400) {
      error(response.body)
    } else {
      success(body)
    }
  })
}
