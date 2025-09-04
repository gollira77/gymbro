/**
 * Middleware de Validación
 * Valida datos de entrada usando Joi
 */

import Joi from "joi"
import { errorResponse } from "../utils/responseHelper.js"

/**
 * Función helper para crear middleware de validación
 */
const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body)

    if (error) {
      const errorMessage = error.details[0].message
      return errorResponse(res, errorMessage, 400)
    }

    next()
  }
}

// Esquemas de validación
const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Debe ser un email válido",
    "any.required": "El email es requerido",
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "La contraseña debe tener al menos 6 caracteres",
    "any.required": "La contraseña es requerida",
  }),
})

const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  id_rol: Joi.number().integer().min(1).required(),
  datosPersonales: Joi.object().when("id_rol", {
    is: 2, // Cliente
    then: Joi.object({
      nom_cliente: Joi.string().required(),
      ape_cliente: Joi.string().required(),
      dni_cliente: Joi.string().required(),
      fecha_nacimiento_cliente: Joi.date().required(),
      telefono_cliente: Joi.string().optional(),
      direccion_cliente: Joi.string().optional(),
      altura_cliente: Joi.number().positive().optional(),
      peso_cliente: Joi.number().positive().optional(),
      genero_cliente: Joi.string().valid("M", "F", "Otro").required(),
    }),
    otherwise: Joi.object({
      nom_entrenador: Joi.string().required(),
      ape_entrenador: Joi.string().required(),
      dni_entrenador: Joi.string().required(),
      fecha_nacimiento_entrenador: Joi.date().required(),
      telefono_entrenador: Joi.string().optional(),
      direccion_entrenador: Joi.string().optional(),
      id_especialidad: Joi.number().integer().required(),
    }),
  }),
})

const resetPasswordSchema = Joi.object({
  token: Joi.string().required(),
  newPassword: Joi.string().min(6).required(),
})

const clienteSchema = Joi.object({
  nom_cliente: Joi.string().max(100).required(),
  ape_cliente: Joi.string().max(100).required(),
  dni_cliente: Joi.string().max(20).required(),
  fecha_nacimiento_cliente: Joi.date().required(),
  telefono_cliente: Joi.string().max(20).optional(),
  direccion_cliente: Joi.string().optional(),
  altura_cliente: Joi.number().positive().max(3).optional(),
  peso_cliente: Joi.number().positive().max(500).optional(),
  genero_cliente: Joi.string().valid("M", "F", "Otro").required(),
})

const rutinaSchema = Joi.object({
  nombre_rutina: Joi.string().max(200).required(),
  descrip_rutina: Joi.string().optional(),
  id_entrenador: Joi.number().integer().required(),
  id_tipo_rut: Joi.number().integer().required(),
  duracion: Joi.number().integer().positive().optional(),
  ejercicios: Joi.array()
    .items(
      Joi.object({
        id_ejercicio: Joi.number().integer().required(),
        series: Joi.number().integer().positive().required(),
        repeticiones: Joi.number().integer().positive().required(),
        orden: Joi.number().integer().positive().required(),
      }),
    )
    .optional(),
})

const ejercicioSchema = Joi.object({
  nom_ejercicio: Joi.string().max(200).required(),
  descrip_ejercicio: Joi.string().optional(),
  imagen: Joi.string().optional(),
  video_url: Joi.string().uri().optional(),
  id_categoria: Joi.number().integer().required(),
})

// Exportar middlewares de validación
export const validateLogin = validate(loginSchema)
export const validateRegister = validate(registerSchema)
export const validateResetPassword = validate(resetPasswordSchema)
export const validateCliente = validate(clienteSchema)
export const validateRutina = validate(rutinaSchema)
export const validateEjercicio = validate(ejercicioSchema)
