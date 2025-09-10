import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import crypto from "crypto"
import { Op } from "sequelize"
import { Usuario, Rol, Cliente, Entrenador } from "../models/index.js"
import Especialidad from "../models/Especialidad.js"
import { sendEmail } from "../utils/emailHelper.js"
import { logger } from "../utils/logger.js"

class AuthService {
  /**
   * Iniciar sesión de usuario
   */
  async login(email, password) {
    // Buscar usuario con rol incluido
    const usuario = await Usuario.findOne({
      where: { email, activo: true },
      include: [
        {
          model: Rol,
          as: "rol",
          attributes: ["rol", "descrip_rol"],
        },
      ],
    })

    if (!usuario) {
      throw new Error("Credenciales inválidas")
    }

    // Verificar contraseña
    const isValidPassword = await bcrypt.compare(password, usuario.password)
    if (!isValidPassword) {
      throw new Error("Credenciales inválidas")
    }

    // Generar token JWT
    const token = this.generateToken(usuario)

    // Obtener datos adicionales según el rol
    let datosAdicionales = null
    if (usuario.rol.rol === "cliente") {
      datosAdicionales = await Cliente.findOne({
        where: { id_usuario: usuario.id_usuario },
      })
    } else if (usuario.rol.rol === "entrenador") {
      datosAdicionales = await Entrenador.findOne({
        where: { id_usuario: usuario.id_usuario },
        include: [
          {
            model: Especialidad,
            as: "especialidad",
          },
        ],
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
   * Registrar nuevo usuario
   */
  async register(userData) {
    const { email, password, id_rol, datosPersonales } = userData

    // Verificar si el usuario ya existe
    const existingUser = await Usuario.findOne({ where: { email } })
    if (existingUser) {
      throw new Error("El email ya está registrado")
    }

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 12)

    // Crear usuario
    const usuario = await Usuario.create({
      email,
      password: hashedPassword,
      id_rol,
    })

    // Crear datos adicionales según el rol
    if (id_rol === 2) {
      // Cliente
      await Cliente.create({
        id_usuario: usuario.id_usuario,
        ...datosPersonales,
      })
    } else if (id_rol === 3) {
      // Entrenador
      await Entrenador.create({
        id_usuario: usuario.id_usuario,
        ...datosPersonales,
      })
    }

    // Generar token
    const token = this.generateToken(usuario)

    return {
      token,
      usuario: {
        id: usuario.id_usuario,
        email: usuario.email,
        rol: id_rol,
      },
    }
  }

  /**
   * Solicitar recuperación de contraseña
   */
  async forgotPassword(email) {
    const usuario = await Usuario.findOne({ where: { email } })

    if (!usuario) {
      // No revelar si el email existe o no por seguridad
      return
    }

    // Generar token de recuperación
    const resetToken = crypto.randomBytes(32).toString("hex")
    const tokenExpiry = new Date(Date.now() + 3600000) // 1 hora

    // Guardar token en la base de datos
    await usuario.update({
      token_recuperacion: resetToken,
      fecha_expiracion_token: tokenExpiry,
    })

    // Enviar email con el token
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
  }

  /**
   * Restablecer contraseña con token
   */
  async resetPassword(token, newPassword) {
    const usuario = await Usuario.findOne({
      where: {
        token_recuperacion: token,
        fecha_expiracion_token: { [Op.gt]: new Date() },
      },
    })

    if (!usuario) {
      throw new Error("Token inválido o expirado")
    }

    // Encriptar nueva contraseña
    const hashedPassword = await bcrypt.hash(newPassword, 12)

    // Actualizar contraseña y limpiar token
    await usuario.update({
      password: hashedPassword,
      token_recuperacion: null,
      fecha_expiracion_token: null,
    })
  }

  /**
   * Verificar token JWT
   */
  async verifyToken(token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      const usuario = await Usuario.findByPk(decoded.id, {
        include: [
          {
            model: Rol,
            as: "rol",
            attributes: ["rol"],
          },
        ],
      })

      if (!usuario || !usuario.activo) {
        throw new Error("Usuario no válido")
      }

      return {
        id: usuario.id_usuario,
        email: usuario.email,
        rol: usuario.rol.rol,
      }
    } catch (error) {
      throw new Error("Token inválido")
    }
  }

  /**
   * Generar token JWT
   */
  generateToken(usuario) {
    return jwt.sign(
      {
        id: usuario.id_usuario,
        email: usuario.email,
        rol: usuario.id_rol,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE || "7d" },
    )
  }
}

export default new AuthService()
