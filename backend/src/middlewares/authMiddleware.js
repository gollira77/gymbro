/**
 * Middleware de Autenticación y Autorización
 * Verifica tokens JWT y permisos de usuario
 */

import jwt from "jsonwebtoken"
import { Usuario, Rol } from "../models/index.js"
import { errorResponse } from "../utils/responseHelper.js"

/**
 * Middleware para verificar autenticación JWT
 */
export const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]

    if (!token) {
      return errorResponse(res, "Token de acceso requerido", 401)
    }

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
      return errorResponse(res, "Usuario no válido", 401)
    }

    req.user = {
      id: usuario.id_usuario,
      email: usuario.email,
      rol: usuario.rol.rol,
      id_rol: usuario.id_rol,
    }

    next()
  } catch (error) {
    return errorResponse(res, "Token inválido", 401)
  }
}

/**
 * Middleware para autorización por roles
 */
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return errorResponse(res, "Usuario no autenticado", 401)
    }

    if (!roles.includes(req.user.rol)) {
      return errorResponse(res, "No tienes permisos para acceder a este recurso", 403)
    }

    next()
  }
}

/**
 * Middleware para verificar si el usuario es propietario del recurso
 */
export const checkOwnership = (userIdField = "id_usuario") => {
  return (req, res, next) => {
    const resourceUserId = req.params[userIdField] || req.body[userIdField]

    if (req.user.rol === "admin" || req.user.rol === "jefe") {
      return next()
    }

    if (req.user.id !== Number.parseInt(resourceUserId)) {
      return errorResponse(res, "No tienes permisos para acceder a este recurso", 403)
    }

    next()
  }
}
