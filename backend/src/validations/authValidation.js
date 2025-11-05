import Joi from "joi";

// src/validations/authValidation.js
export const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  id_rol: Joi.number().required(),
  datosPersonales: Joi.object({
    nombre: Joi.string().min(2).max(50).required(),
    apellido: Joi.string().min(2).max(50).required(),
    dni: Joi.string().min(6).max(20).required(),
    fecha_nacimiento: Joi.date().required(),
    genero: Joi.string().valid("M", "F", "O").required(),
    telefono: Joi.string().min(6).max(20).optional().allow(null, ""),
    direccion: Joi.string().min(2).max(100).optional().allow(null, ""),
  }).optional(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "El correo electrónico no es válido",
    "any.required": "El correo electrónico es obligatorio",
  }),
  password: Joi.string().required().messages({
    "any.required": "La contraseña es obligatoria",
  }),
});

export const forgotPasswordSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "El correo electrónico no es válido",
    "any.required": "El correo electrónico es obligatorio",
  }),
});

export const resetPasswordSchema = Joi.object({
  token: Joi.string().required(),
  password: Joi.string().min(6).required(),
});
