declare module 'xhr' {
  interface Options {
    url: string
    json: boolean
  }

  interface Response {
    statusCode: number
    body: string
  }

  export = function xhr(
    options: Options,
    callback: (error: Error | null, response: Response, body: Object) => void
  ): XMLHttpRequest
}

import {Component} from 'react';

declare module 'react-focus-trap' {
  export interface FocusTrapProperties {
    active: boolean,
    onExit: () => void
    children: React.ReactNode
  }

  export = class FocusTrap extends Component<FocusTrapProperties, any> {}
}
