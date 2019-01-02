export enum LogLevel {
  Warning = 'warning',
  Error = 'error'
}

export function logger(level: LogLevel, message: String) {
  switch (level) {
    case LogLevel.Warning:
      console.warn(message)
    case LogLevel.Error:
      console.error(message)
    default:
      console.log(message)
  }
}
