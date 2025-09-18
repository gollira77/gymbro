// src/services/authService.js
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
   * Login de usuario
   */
  async login(email, password) {
    const usuario = await Usuario.findOne({
      where: { email, activo: true },
      include: [{ model: Rol, as: "rol", attributes: ["rol", "descrip_rol"] }],
    })

    if (!usuario) throw new AuthError("Credenciales inválidas")

    const isValidPassword = await bcrypt.compare(password, usuario.password)
    if (!isValidPassword) throw new AuthError("Credenciales inválidas")

    const token = this.generateToken(usuario)

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
   * Registro de usuario
   */
  async register(userData) {
  const { email, password, id_rol, datosPersonales } = userData

  return await sequelize.transaction(async (t) => {
    // 1️⃣ Verificar si el email ya existe
    const existingUser = await Usuario.findOne({ where: { email }, transaction: t })
    if (existingUser) throw new ValidationError("El email ya está registrado")

    // 2️⃣ Hashear contraseña
    const hashedPassword = await bcrypt.hash(password, 12)

    // 3️⃣ Crear usuario
    const usuario = await Usuario.create(
      { email, password: hashedPassword, id_rol },
      { transaction: t }
    )

    // 4️⃣ Crear perfil según el rol
    if (id_rol === 1) { // Cliente
      const { nom_cliente, ape_cliente, dni_cliente, fecha_nacimiento_cliente, genero_cliente } = datosPersonales
      if (!nom_cliente || !ape_cliente || !dni_cliente || !fecha_nacimiento_cliente || !genero_cliente) {
        throw new ValidationError("Faltan datos obligatorios para cliente")
      }

      await Cliente.create(
        {
          id_usuario: usuario.id_usuario, // FK segura, ya existe Usuario
          nombre: nom_cliente,
          apellido: ape_cliente,
          dni: dni_cliente,
          fecha_nacimiento: fecha_nacimiento_cliente,
          genero: genero_cliente,
          telefono: datosPersonales.telefono_cliente || null,
          direccion: datosPersonales.direccion_cliente || null,
        },
        { transaction: t }
      )
    } else if (id_rol === 2) { // Entrenador
      const { nom_entrenador, ape_entrenador, dni_entrenador, fecha_nacimiento_entrenador, id_especialidad, genero } = datosPersonales
      await Entrenador.create(
        {
          id_usuario: usuario.id_usuario,
          nombre: nom_entrenador,
          apellido: ape_entrenador,
          dni: dni_entrenador,
          fecha_nacimiento: fecha_nacimiento_entrenador,
          id_especialidad,
          genero,
        },
        { transaction: t }
      )
    }

    // 5️⃣ Generar token
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
    if (!usuario) return

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
  }

  /**
   * Restablecer contraseña
   */
  async resetPassword(token, newPassword) {
    const usuario = await Usuario.findOne({
      where: { token_recuperacion: token, fecha_expiracion_token: { [Op.gt]: new Date() } },
    })

    if (!usuario) throw new AuthError("Token inválido o expirado")

    const hashedPassword = await bcrypt.hash(newPassword, 12)
    await usuario.update({ password: hashedPassword, token_recuperacion: null, fecha_expiracion_token: null })
  }

  /**
   * Verificar token JWT
   */
  async verifyToken(token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      const usuario = await Usuario.findByPk(decoded.id, { include: [{ model: Rol, as: "rol", attributes: ["rol"] }] })
      if (!usuario || !usuario.activo) throw new AuthError("Usuario no válido")
      return { id: usuario.id_usuario, email: usuario.email, rol: usuario.rol.rol }
    } catch (error) {
      throw new AuthError("Token inválido")
    }
  }

  /**
   * Generar JWT
   */
  generateToken(usuario) {
    return jwt.sign(
      { id: usuario.id_usuario, email: usuario.email, rol: usuario.id_rol },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE || "30d" }
    )
  }
}

export default new AuthService()
