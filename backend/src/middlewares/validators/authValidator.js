// src/middlewares/validators/authValidator.js
import { body } from "express-validator";
import { Rol } from "../../models/index.js"; // tu modelo Rol

// Registro de usuario
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

  // Campos obligatorios para entrenador
  body("datosPersonales.nombre")
  .if(body("id_rol").equals("2")) // entrenador
  .notEmpty().withMessage("El nombre del entrenador es obligatorio"),

body("datosPersonales.apellido")
  .if(body("id_rol").equals("2"))
  .notEmpty().withMessage("El apellido del entrenador es obligatorio"),

body("datosPersonales.dni")
  .if(body("id_rol").equals("2"))
  .notEmpty().withMessage("El DNI del entrenador es obligatorio"),

body("datosPersonales.fecha_nacimiento")
  .if(body("id_rol").equals("2"))
  .notEmpty().withMessage("La fecha de nacimiento del entrenador es obligatoria"),

body("datosPersonales.genero")
  .if(body("id_rol").equals("2"))
  .notEmpty().withMessage("El género del entrenador es obligatorio"),

]

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
