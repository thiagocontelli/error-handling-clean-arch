export enum ErrorType {
  Http = 'http',
  Username = 'username',
  Password = 'password'
}

export enum ErrorMessageCode {
  InvalidUsername = 'invalid-username',
  InvalidPassword = 'invalid-password',
  UsernameNotFound = 'username-not-found',
  InvalidCredentials = 'invalid-credentials',
  InvalidEmail = 'invalid-email',
  PasswordGreaterThan8 = 'password-greater-than-8',
  UsernameGreaterThan8 = 'username-greater-than-8',
  UnknownError = 'unknown-error'
}

export class CustomError extends Error {
  constructor(
    readonly type: ErrorType,
    readonly message: string
  ) {
    super(message)
  }
}