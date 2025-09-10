import { ForbiddenError } from "../utils/errors.js"
import { rolesPermissions } from "../config/permissions.js"

export const authorize = (requiredPermission) => {
  return (req, res, next) => {
    const userRole = req.user?.rol
    if (!userRole) {
      return next(new ForbiddenError("Rol no especificado"))
    }

    const permissions = rolesPermissions[userRole] || []
    if (!permissions.includes(requiredPermission)) {
      return next(new ForbiddenError("No tienes permisos para esta acción"))
    }

    next()
  }
}
