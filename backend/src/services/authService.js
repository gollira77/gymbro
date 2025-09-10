import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import crypto from "crypto"
import { Op } from "sequelize"
import { sequelize, Usuario, Rol, Cliente, Entrenador } from "../models/index.js"
import Especialidad from "../models/Especialidad.js"
import { sendEmail } from "../utils/emailHelper.js"
import { logger } from "../utils/logger.js"
import { AuthError, ValidationError } from "../utils/errors.js"

class AuthService {
  /**
   * Iniciar sesión de usuario
   */
  async login(email, password) {
    const usuario = await Usuario.findOne({
      where: { email, activo: true },
      include: [
        { model: Rol, as: "rol", attributes: ["rol", "descrip_rol"] },
      ],
    })

    if (!usuario) {
      logger.warn(`Login fallido: email no encontrado - ${email}`)
      throw new AuthError("Credenciales inválidas")
    }

    const isValidPassword = await bcrypt.compare(password, usuario.password)
    if (!isValidPassword) {
      logger.warn(`Login fallido: contraseña incorrecta - ${email}`)
      throw new AuthError("Credenciales inválidas")
    }

    const token = this.generateToken(usuario)
    logger.info(`Login exitoso: ${email}`)

    let datosAdicionales = null
    if (usuario.rol.rol === "cliente") {
      datosAdicionales = await Cliente.findOne({ where: { id_usuario: usuario.id_usuario } })
    } else if (usuario.rol.rol === "entrenador") {
      datosAdicionales = await Entrenador.findOne({
        where: { id_usuario: usuario.id_usuario },
        include: [{ model: Especialidad, as: "especialidad" }],
      })
    }

    return {
      token,
      usuario: {
        id: usuario.id_usuario,
        email: usuario.email,
        rol: usuario.rol.rol,
        datosAdicionales,
      },
    }
  }

  /**
   * Registrar nuevo usuario (con transacción)
   */
  async register(userData) {
    const { email, password, id_rol, datosPersonales } = userData

    return await sequelize.transaction(async (t) => {
      const existingUser = await Usuario.findOne({ where: { email }, transaction: t })
      if (existingUser) {
        logger.warn(`Registro fallido: email ya registrado - ${email}`)
        throw new ValidationError("El email ya está registrado")
      }

      const hashedPassword = await bcrypt.hash(password, 12)

      const usuario = await Usuario.create(
        { email, password: hashedPassword, id_rol },
        { transaction: t }
      )

      if (id_rol === 2) {
        await Cliente.create({ id_usuario: usuario.id_usuario, ...datosPersonales }, { transaction: t })
      } else if (id_rol === 3) {
        await Entrenador.create({ id_usuario: usuario.id_usuario, ...datosPersonales }, { transaction: t })
      }

      logger.info(`Usuario registrado correctamente: ${email}`)

      const token = this.generateToken(usuario)
      return {
        token,
        usuario: { id: usuario.id_usuario, email: usuario.email, rol: id_rol },
      }
    })
  }

  /**
   * Solicitar recuperación de contraseña
   */
  async forgotPassword(email) {
    const usuario = await Usuario.findOne({ where: { email } })
    if (!usuario) {
      logger.warn(`Solicitud de recuperación de contraseña: email no encontrado - ${email}`)
      return
    }

    const resetToken = crypto.randomBytes(32).toString("hex")
    const tokenExpiry = new Date(Date.now() + 3600000) // 1 hora

    await usuario.update({ token_recuperacion: resetToken, fecha_expiracion_token: tokenExpiry })

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`

    await sendEmail({
      to: email,
      subject: "Recuperación de contraseña - GymBro",
      html: `
        <h2>Recuperación de contraseña</h2>
        <p>Has solicitado restablecer tu contraseña. Haz clic en el siguiente enlace:</p>
        <a href="${resetUrl}">Restablecer contraseña</a>
        <p>Este enlace expira en 1 hora.</p>
        <p>Si no solicitaste esto, ignora este email.</p>
      `,
    })

    logger.info(`Token de recuperación de contraseña generado para: ${email}`)
  }

  /**
   * Restablecer contraseña con token
   */
  async resetPassword(token, newPassword) {
    const usuario = await Usuario.findOne({
      where: { token_recuperacion: token, fecha_expiracion_token: { [Op.gt]: new Date() } },
    })

    if (!usuario) {
      logger.warn(`Intento de reset de contraseña con token inválido: ${token}`)
      throw new AuthError("Token inválido o expirado")
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12)

    await usuario.update({ password: hashedPassword, token_recuperacion: null, fecha_expiracion_token: null })
    logger.info(`Contraseña actualizada correctamente para: ${usuario.email}`)
  }

  /**
   * Verificar token JWT
   */
  async verifyToken(token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      const usuario = await Usuario.findByPk(decoded.id, { include: [{ model: Rol, as: "rol", attributes: ["rol"] }] })

      if (!usuario || !usuario.activo) {
        logger.warn(`Verificación de token fallida: usuario inválido o inactivo - ID: ${decoded.id}`)
        throw new AuthError("Usuario no válido")
      }

      logger.debug(`Token verificado correctamente para: ${usuario.email}`)
      return { id: usuario.id_usuario, email: usuario.email, rol: usuario.rol.rol }
    } catch (error) {
      logger.warn(`Token inválido o expirado`)
      throw new AuthError("Token inválido")
    }
  }

  /**
   * Generar token JWT
   */
  generateToken(usuario) {
    const token = jwt.sign(
      { id: usuario.id_usuario, email: usuario.email, rol: usuario.id_rol },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE || "30d" }
    )

    logger.debug(`JWT generado para usuario: ${usuario.email}`)
    return token
  }
}

export default new AuthService()
