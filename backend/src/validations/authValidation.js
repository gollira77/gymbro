import Joi from "joi";

export const registerSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "El correo electrónico no es válido",
    "any.required": "El correo electrónico es obligatorio",
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "La contraseña debe tener al menos 6 caracteres",
    "any.required": "La contraseña es obligatoria",
  }),
  id_rol: Joi.number().required().messages({
    "any.required": "El rol es obligatorio",
  }),
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
