import { body } from "express-validator"
import { Rol } from "../../models/index.js" // importa tu modelo Rol

export const registerValidation = [
  body("email")
    .isEmail().withMessage("El email no es válido")
    .normalizeEmail(),
  body("password")
    .isLength({ min: 6 }).withMessage("La contraseña debe tener al menos 6 caracteres"),
  body("id_rol")
    .notEmpty().withMessage("El rol es obligatorio")
    .bail()
    .isInt({ min: 1 }).withMessage("El rol debe ser un número")
    .bail()
    .custom(async (value) => {
      const rol = await Rol.findByPk(value)
      if (!rol) return Promise.reject("Rol no válido")
    }),
  body("datosPersonales.nombre")
    .notEmpty().withMessage("El nombre es obligatorio"),
  body("datosPersonales.apellido")
    .notEmpty().withMessage("El apellido es obligatorio"),
  body("datosPersonales.dni")
    .isNumeric().withMessage("El DNI debe ser numérico"),
]

export const loginValidation = [
  body("email")
    .isEmail().withMessage("El email no es válido")
    .normalizeEmail(),
  body("password")
    .notEmpty().withMessage("La contraseña es obligatoria"),
]

export const forgotPasswordValidation = [
  body("email")
    .isEmail().withMessage("El email no es válido")
    .normalizeEmail(),
]

export const resetPasswordValidation = [
  body("token")
    .notEmpty().withMessage("El token es obligatorio"),
  body("newPassword")
    .isLength({ min: 6 }).withMessage("La contraseña debe tener al menos 6 caracteres"),
]
