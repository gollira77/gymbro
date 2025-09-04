/**
 * Middleware de Manejo de Errores
 * Captura y formatea errores de la aplicación
 */

import { logger } from "../utils/logger.js"

/**
 * Middleware para rutas no encontradas
 */
export const notFound = (req, res, next) => {
  const error = new Error(`Ruta no encontrada - ${req.originalUrl}`)
  res.status(404)
  next(error)
}

/**
 * Middleware global de manejo de errores
 */
export const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode
  let message = err.message

  // Error de Sequelize - Validación
  if (err.name === "SequelizeValidationError") {
    statusCode = 400
    message = err.errors.map((error) => error.message).join(", ")
  }

  // Error de Sequelize - Unique constraint
  if (err.name === "SequelizeUniqueConstraintError") {
    statusCode = 400
    message = "Ya existe un registro con estos datos"
  }

  // Error de Sequelize - Foreign key constraint
  if (err.name === "SequelizeForeignKeyConstraintError") {
    statusCode = 400
    message = "Referencia inválida a otro registro"
  }

  // Error de JWT
  if (err.name === "JsonWebTokenError") {
    statusCode = 401
    message = "Token inválido"
  }

  if (err.name === "TokenExpiredError") {
    statusCode = 401
    message = "Token expirado"
  }

  // Log del error
  logger.error(`Error ${statusCode}: ${message}`, {
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
    ip: req.ip,
  })

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  })
}
