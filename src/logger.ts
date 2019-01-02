export enum LogLevel {
  Warning = 'warning',
  Error = 'error'
}

export function logger(level: LogLevel, message: String) {
  switch (level) {
    case LogLevel.Warning:
      console.warn(message)
      break
    case LogLevel.Error:
      console.error(message)
      break
    default:
      console.log(message)
      break
  }
}
