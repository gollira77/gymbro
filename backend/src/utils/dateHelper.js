/**
 * Helper para manejo de fechas
 */

import moment from "moment"

/**
 * Formatear fecha para mostrar
 */
export const formatDate = (date, format = "DD/MM/YYYY") => {
  return moment(date).format(format)
}

/**
 * Formatear fecha y hora
 */
export const formatDateTime = (date, format = "DD/MM/YYYY HH:mm") => {
  return moment(date).format(format)
}

/**
 * Calcular edad a partir de fecha de nacimiento
 */
export const calculateAge = (birthDate) => {
  return moment().diff(moment(birthDate), "years")
}

/**
 * Verificar si una fecha está en el pasado
 */
export const isPastDate = (date) => {
  return moment(date).isBefore(moment())
}

/**
 * Verificar si una fecha está en el futuro
 */
export const isFutureDate = (date) => {
  return moment(date).isAfter(moment())
}

/**
 * Obtener inicio y fin de semana
 */
export const getWeekRange = (date = new Date()) => {
  const start = moment(date).startOf("week")
  const end = moment(date).endOf("week")
  return { start: start.toDate(), end: end.toDate() }
}

/**
 * Obtener inicio y fin de mes
 */
export const getMonthRange = (date = new Date()) => {
  const start = moment(date).startOf("month")
  const end = moment(date).endOf("month")
  return { start: start.toDate(), end: end.toDate() }
}

/**
 * Agregar días a una fecha
 */
export const addDays = (date, days) => {
  return moment(date).add(days, "days").toDate()
}

/**
 * Restar días a una fecha
 */
export const subtractDays = (date, days) => {
  return moment(date).subtract(days, "days").toDate()
}
