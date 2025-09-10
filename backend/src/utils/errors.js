export class AppError extends Error {
  constructor(message, statusCode = 500, errors = null) {
    super(message)
    this.name = this.constructor.name
    this.statusCode = statusCode
    this.errors = errors
    Error.captureStackTrace(this, this.constructor)
  }
}

export class ValidationError extends AppError {
  constructor(message = "Validación inválida", errors = null) {
    super(message, 400, errors)
  }
}

export class AuthError extends AppError {
  constructor(message = "Autenticación fallida", errors = null) {
    super(message, 401, errors)
  }
}

export class ForbiddenError extends AppError {
  constructor(message = "No autorizado", errors = null) {
    super(message, 403, errors)
  }
}

export class NotFoundError extends AppError {
  constructor(message = "No encontrado", errors = null) {
    super(message, 404, errors)
  }
}
