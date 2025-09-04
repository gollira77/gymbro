/**
 * Helper para respuestas estandarizadas de la API
 */

/**
 * Respuesta exitosa estandarizada
 */
export const successResponse = (
  res,
  data = null,
  message = "Operación exitosa",
  statusCode = 200
) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
    timestamp: new Date().toISOString(),
  })
}

/**
 * Respuesta de error estandarizada
 */
export const errorResponse = (
  res,
  message = "Error interno del servidor",
  statusCode = 500,
  errors = null
) => {
  return res.status(statusCode).json({
    success: false,
    message,
    errors,
    timestamp: new Date().toISOString(),
  })
}

/**
 * Respuesta paginada
 */
export const paginatedResponse = (
  res,
  data,
  pagination,
  message = "Datos obtenidos exitosamente"
) => {
  return res.status(200).json({
    success: true,
    message,
    data,
    pagination: {
      currentPage: pagination.page,
      totalPages: Math.ceil(pagination.total / pagination.limit),
      totalItems: pagination.total,
      itemsPerPage: pagination.limit,
      hasNextPage:
        pagination.page < Math.ceil(pagination.total / pagination.limit),
      hasPrevPage: pagination.page > 1,
    },
    timestamp: new Date().toISOString(),
  })
}
