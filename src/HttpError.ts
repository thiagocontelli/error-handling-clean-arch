export class HttpError extends Error {
  constructor(
    readonly message: string,
    readonly status: number
  ) {
    super(message)
  }
}