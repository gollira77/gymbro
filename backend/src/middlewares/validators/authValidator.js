// authValidator.js
import { body } from "express-validator"
import { Rol } from "../../models/index.js" // tu modelo Rol

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
]
