import { errorResponse } from "../utils/responseHelper.js"
import { logger } from "../utils/logger.js"

export const notFound = (req, res, next) => {
  return errorResponse(res, `No se encontró la ruta: ${req.originalUrl}`, 404)
}

export const errorHandler = (err, req, res, next) => {
  logger.error(err.message, { stack: err.stack })

  // Si es un error conocido (propio)
  if (err.name === "ValidationError") {
    return errorResponse(res, err.message, 400, err.errors || null)
  }

  if (err.name === "AuthError") {
    return errorResponse(res, err.message, 401)
  }

  if (err.name === "ForbiddenError") {
    return errorResponse(res, err.message, 403)
  }

  // Error genérico
  return errorResponse(res, "Error interno del servidor", 500)
}
