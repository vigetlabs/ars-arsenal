/**
 * @flow
 */

import xhr from 'xhr'

export function isValidSlug(slug: any): boolean {
  return !!slug || slug === 0
}

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
