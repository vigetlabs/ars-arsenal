import xhr from 'xhr'

type OnSuccess = (body: Object) => void
type OnError = (error: Error) => void

export function request(url: string, success: OnSuccess, error: OnError) {
  return xhr({ url: url, json: true }, (err, response, body) => {
    if (err) {
      error(err)
    } else if (response.statusCode >= 400) {
      error(new Error(response.body as string))
    } else {
      success(body)
    }
  })
}
