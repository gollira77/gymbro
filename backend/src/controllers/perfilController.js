// controllers/perfilController.js
import { Cliente, Entrenador } from "../models/index.js"
import { successResponse, errorResponse } from "../utils/responseHelper.js"

class PerfilController {
  async createOrUpdate(req, res) {
    try {
      const { id_usuario, id_rol } = req.user // viene del token JWT
      const data = req.body

      let perfil

      if (id_rol === 1) {
        // Perfil Cliente
        perfil = await Cliente.upsert({ ...data, id_usuario })
      } else if (id_rol === 2) {
        // Perfil Entrenador
        perfil = await Entrenador.upsert({ ...data, id_usuario })
      } else {
        return errorResponse(res, "Rol no soportado", 400)
      }

      return successResponse(res, perfil, "Perfil actualizado/creado correctamente")
    } catch (error) {
      return errorResponse(res, error.message, 500)
    }
  }
}

export default new PerfilController()
