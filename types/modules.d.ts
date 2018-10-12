declare module 'xhr' {
  interface Options {
    url: string
    json: boolean
  }

  interface Response {
    statusCode: number
    body: string
  }

  export default function xhr(
    options: Options,
    callback: (error: Error | null, response: Response, body: Object) => void
  ): XMLHttpRequest
}

import { Component } from 'react'

declare module 'react-focus-trap' {
  interface FocusTrapProperties {
    active: boolean
    onExit: () => void
    children: React.ReactNode
  }

  export default class FocusTrap extends Component<FocusTrapProperties, any> {}
}
