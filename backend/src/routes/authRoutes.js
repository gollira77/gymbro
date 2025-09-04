/**
 * Rutas de autenticación - Login, registro, recuperación de contraseña
 */

import express from "express"
const router = express.Router()
import authController from "../controllers/authController.js"
import { validateLogin, validateRegister, validateResetPassword } from "../middlewares/validationMiddleware.js"

/**
 * @route   POST /api/auth/login
 * @desc    Iniciar sesión
 * @access  Public
 * @body    { email, password }
 */
router.post("/login", validateLogin, authController.login)

/**
 * @route   POST /api/auth/register
 * @desc    Registrar nuevo usuario
 * @access  Public
 * @body    { email, password, id_rol, datosPersonales }
 */
router.post("/register", validateRegister, authController.register)

/**
 * @route   POST /api/auth/forgot-password
 * @desc    Solicitar recuperación de contraseña
 * @access  Public
 * @body    { email }
 */
router.post("/forgot-password", authController.forgotPassword)

/**
 * @route   POST /api/auth/reset-password
 * @desc    Restablecer contraseña con token
 * @access  Public
 * @body    { token, newPassword }
 */
router.post("/reset-password", validateResetPassword, authController.resetPassword)

/**
 * @route   POST /api/auth/verify-token
 * @desc    Verificar validez del token JWT
 * @access  Private
 */
router.post("/verify-token", authController.verifyToken)

export default router