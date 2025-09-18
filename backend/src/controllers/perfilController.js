// controllers/perfilController.js
import { Cliente, Entrenador } from "../models/index.js"
import { successResponse, errorResponse } from "../utils/responseHelper.js"

class PerfilController {
  async createOrUpdate(req, res) {
    try {
      const { id, id_rol } = req.user;
      const id_usuario = id; // renombramos id a id_usuario

      const data = req.body

      let perfil

      if (id_rol === 1) {
        const clienteData = {
          id_usuario,
          nombre: data.nom_cliente,
          apellido: data.ape_cliente,
          dni: data.dni_cliente,
          fecha_nacimiento: data.fecha_nacimiento_cliente,
          genero: data.genero_cliente,
          telefono: data.telefono_cliente || null,
          direccion: data.direccion_cliente || null,
        }

        perfil = await Cliente.upsert(clienteData, data, id_usuario)
      } else if (id_rol === 2) {
        const entrenadorData = {
          id_usuario,
          nombre: data.nom_entrenador,
          apellido: data.ape_entrenador,
          dni: data.dni_entrenador,
          fecha_nacimiento: data.fecha_nacimiento_entrenador,
          telefono: data.telefono_entrenador || null,
          direccion: data.direccion_entrenador || null,
          id_especialidad: data.id_especialidad,
          genero_entrenador: data.genero_entrenador,
        }

        perfil = await Entrenador.upsert(entrenadorData)
      } else {
        return errorResponse(res, "Rol no soportado", 400)
      }

      return successResponse(res, perfil, "Perfil actualizado/creado correctamente")
    } catch (error) {
      return errorResponse(res, error.message, 500)
    }
  }

  // ✅ Nuevo método para GET /perfil
  async getProfile(req, res) {
    try {
      const { id_usuario, id_rol } = req.user
      let perfil

      if (id_rol === 1) {
        perfil = await Cliente.findOne({ where: { id_usuario } })
      } else if (id_rol === 2) {
        perfil = await Entrenador.findOne({ where: { id_usuario } })
      } else {
        return errorResponse(res, "Rol no soportado", 400)
      }

      return successResponse(res, perfil, "Perfil obtenido correctamente")
    } catch (error) {
      return errorResponse(res, error.message, 500)
    }
  }
}

export default new PerfilController()
