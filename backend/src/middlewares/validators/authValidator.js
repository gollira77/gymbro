// src/middlewares/validators/authValidator.js
import { body } from "express-validator";
import { Rol } from "../../models/index.js"; // tu modelo Rol

// Registro de usuario
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
      const rol = await Rol.findByPk(value);
      if (!rol) return Promise.reject("Rol no válido");
    }),
];

// Login
export const loginValidation = [
  body("email")
    .isEmail().withMessage("El email no es válido")
    .normalizeEmail(),

  body("password")
    .notEmpty().withMessage("La contraseña es obligatoria"),
];

// Recuperar contraseña
export const forgotPasswordValidation = [
  body("email")
    .isEmail().withMessage("El email no es válido")
    .normalizeEmail(),
];

// Restablecer contraseña
export const resetPasswordValidation = [
  body("token")
    .notEmpty().withMessage("El token es obligatorio"),

  body("newPassword")
    .isLength({ min: 6 }).withMessage("La nueva contraseña debe tener al menos 6 caracteres"),
];
