import authService from "../services/authService.js"
import * as testService from "../services/testService.js" // <-- importamos testService
import { successResponse, errorResponse } from "../utils/responseHelper.js"
import { logger } from "../utils/logger.js"

class AuthController {
  /**
   * Iniciar sesión de usuario
   */
  async login(req, res) {
    try {
      const { email, password } = req.body
      const result = await authService.login(email, password)
      logger.info(`Usuario ${email} inició sesión exitosamente`)
      return successResponse(res, result, "Inicio de sesión exitoso")
    } catch (error) {
      logger.error("Error en login:", error)
      return errorResponse(res, error.message, 401)
    }
  }

  /**
   * Registrar nuevo usuario
   */
  async register(req, res) {
    try {
      const userData = req.body

      // 1️⃣ Registramos al usuario y obtenemos su info
      const result = await authService.register(userData)

      logger.info(`Nuevo usuario registrado: ${userData.email}`)

      // 2️⃣ Asignar automáticamente test básico al cliente recién registrado
      if (result.id_rol === 1) { // asumimos rol = 1 -> cliente
        await testService.asignarTestBasicoCliente(result.id_usuario)
        logger.info(`Se asignó test básico al cliente: ${userData.email}`)
      }

      return successResponse(res, result, "Usuario registrado exitosamente", 201)
    } catch (error) {
      logger.error("Error en registro:", error)
      return errorResponse(res, error.message, 400)
    }
  }

  /**
   * Solicitar recuperación de contraseña
   */
  async forgotPassword(req, res) {
    try {
      const { email } = req.body
      await authService.forgotPassword(email)
      logger.info(`Solicitud de recuperación de contraseña para: ${email}`)
      return successResponse(res, null, "Si el email existe, recibirás instrucciones para recuperar tu contraseña")
    } catch (error) {
      logger.error("Error en forgot password:", error)
      return errorResponse(res, "Error interno del servidor", 500)
    }
  }

  /**
   * Restablecer contraseña con token
   */
  async resetPassword(req, res) {
    try {
      const { token, newPassword } = req.body
      await authService.resetPassword(token, newPassword)
      logger.info("Contraseña restablecida exitosamente")
      return successResponse(res, null, "Contraseña restablecida exitosamente")
    } catch (error) {
      logger.error("Error en reset password:", error)
      return errorResponse(res, error.message, 400)
    }
  }

  /**
   * Verificar validez del token JWT
   */
  async verifyToken(req, res) {
    try {
      const token = req.headers.authorization?.split(" ")[1]
      if (!token) return errorResponse(res, "Token no proporcionado", 401)
      const result = await authService.verifyToken(token)
      return successResponse(res, result, "Token válido")
    } catch (error) {
      logger.error("Error en verify token:", error)
      return errorResponse(res, error.message, 401)
    }
  }
}

export default new AuthController()
