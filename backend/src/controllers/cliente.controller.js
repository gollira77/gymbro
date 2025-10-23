import Cliente from "../models/Cliente.js"
import { successResponse, errorResponse } from "../utils/responseHelper.js" 

export const crearCliente = async (req, res) => {
  try {
    const nuevoCliente = await Cliente.create(req.body)
    return successResponse(res, nuevoCliente, "Cliente creado correctamente", 201)
  } catch (err) {
    return errorResponse(res, err.message, 400)
  }
}

export const listarClientes = async (req, res) => {
  try {
    const clientes = await Cliente.findAll()
    return successResponse(res, clientes, "Lista de clientes obtenida correctamente")
  } catch (err) {
    return errorResponse(res, err.message, 500)
  }
}

export const obtenerClientePorId = async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id)
    if (!cliente) return errorResponse(res, "Cliente no encontrado", 404)
    return successResponse(res, cliente, "Cliente obtenido correctamente")
  } catch (err) {
    return errorResponse(res, err.message, 500)
  }
}

export const actualizarCliente = async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id)
    if (!cliente) return errorResponse(res, "Cliente no encontrado", 404)

    await cliente.update(req.body)
    return successResponse(res, cliente, "Cliente actualizado correctamente")
  } catch (err) {
    return errorResponse(res, err.message, 400)
  }
}

export const eliminarCliente = async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id)
    if (!cliente) return errorResponse(res, "Cliente no encontrado", 404)

    await cliente.destroy()
    return successResponse(res, {}, "Cliente eliminado correctamente")
  } catch (err) {
    return errorResponse(res, err.message, 500)
  }
}
