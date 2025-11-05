import Cliente from "../models/Cliente.js"
import * as clienteService from "../services/clienteService.js";
import { actualizarEstadoRutina } from "../services/clienteService.js";
import { crearTestBasico } from "../services/testService.js";
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

export const obtenerRutinasAsignadas = async (req, res) => {
  try {
    const { id } = req.params;
    const rutinas = await clienteService.getRutinasAsignadas(id);

    return successResponse(res, {
      message: "Rutinas asignadas obtenidas correctamente",
      data: rutinas,
    });
  } catch (error) {
    return errorResponse(res, error);
  }
};

export const marcarRutina = async (req, res) => {
  try {
    const { id_rutina_cliente, completada, descanso } = req.body;

    const rutinaActualizada = await actualizarEstadoRutina({
      id_rutina_cliente,
      completada,
      descanso
    });

    return successResponse(res, {
      message: "Rutina actualizada correctamente",
      data: rutinaActualizada
    });
  } catch (error) {
    return errorResponse(res, error.message || "Error al actualizar rutina");
  }
};

export const realizarTestBasico = async (req, res) => {
  try {
    const { id_usuario, respuestas } = req.body;

    if (!respuestas) throw new Error("No se enviaron respuestas");

    const test = await crearTestBasico({
      id_usuario,
      id_tipo_test: 1, // 1 = Test Básico
      respuestas
    });

    return successResponse(res, { message: "Test guardado correctamente", data: test });
  } catch (error) {
    return errorResponse(res, error.message || "Error al guardar test");
  }
};