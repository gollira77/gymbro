import dayjs from "dayjs"

// Formatear fecha
export const formatDate = (date, format = "DD/MM/YYYY") => dayjs(date).format(format)

// Formatear fecha y hora
export const formatDateTime = (date, format = "DD/MM/YYYY HH:mm") => dayjs(date).format(format)

// Calcular edad
export const calculateAge = (birthDate) => dayjs().diff(dayjs(birthDate), "year")

// Fecha pasada / futura
export const isPastDate = (date) => dayjs(date).isBefore(dayjs())
export const isFutureDate = (date) => dayjs(date).isAfter(dayjs())

// Inicio y fin de semana
export const getWeekRange = (date = new Date()) => ({
  start: dayjs(date).startOf("week").toDate(),
  end: dayjs(date).endOf("week").toDate(),
})

// Inicio y fin de mes
export const getMonthRange = (date = new Date()) => ({
  start: dayjs(date).startOf("month").toDate(),
  end: dayjs(date).endOf("month").toDate(),
})

// Sumar / restar días
export const addDays = (date, days) => dayjs(date).add(days, "day").toDate()
export const subtractDays = (date, days) => dayjs(date).subtract(days, "day").toDate()
