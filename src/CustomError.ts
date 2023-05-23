export enum ErrorType {
  Http = 'http',
  UsernameInput = 'username',
  PasswordInput = 'password'
}

export class CustomError extends Error {
  constructor(
    readonly type: ErrorType,
    readonly message: string
  ) {
    super(message)
  }
}