import { body } from "express-validator"

export const registerValidation = [
  body("email")
    .isEmail().withMessage("El email no es válido")
    .normalizeEmail(),
  body("password")
    .isLength({ min: 6 }).withMessage("La contraseña debe tener al menos 6 caracteres"),
  body("rol")
    .isIn(["cliente", "entrenador", "admin"]).withMessage("Rol no válido"),
  body("datosPersonales.nombre")
    .notEmpty().withMessage("El nombre es obligatorio"),
  body("datosPersonales.apellido")
    .notEmpty().withMessage("El apellido es obligatorio"),
  body("datosPersonales.dni")
    .isNumeric().withMessage("El DNI debe ser numérico"),
]

export const loginValidation = [
  body("email").isEmail().withMessage("El email no es válido"),
  body("password").notEmpty().withMessage("La contraseña es obligatoria"),
]

export const forgotPasswordValidation = [
  body("email").isEmail().withMessage("El email no es válido"),
]

export const resetPasswordValidation = [
  body("token").notEmpty().withMessage("El token es obligatorio"),
  body("newPassword")
    .isLength({ min: 6 }).withMessage("La contraseña debe tener al menos 6 caracteres"),
]
