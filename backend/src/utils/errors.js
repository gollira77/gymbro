export class ValidationError extends Error {
  constructor(message, errors = null) {
    super(message)
    this.name = "ValidationError"
    this.errors = errors
  }
}

export class AuthError extends Error {
  constructor(message) {
    super(message)
    this.name = "AuthError"
  }
}

export class ForbiddenError extends Error {
  constructor(message) {
    super(message)
    this.name = "ForbiddenError"
  }
}
