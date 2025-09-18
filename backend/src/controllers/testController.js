// src/controllers/testController.js
import * as testService from "../services/testService.js";
import { successResponse, errorResponse } from "../utils/responseHelper.js";
import { logger } from "../utils/logger.js";

class TestController {
  /**
   * Crear un test (solo entrenadores)
   */
  async crearTest(req, res) {
    try {
      const { rol, id_usuario: idEntrenador } = req.user; // req.user viene del authMiddleware
      const { id_tipo_test, resul_test, id_usuario } = req.body;

      // Solo entrenadores pueden crear tests
      if (rol !== 2) {
        return errorResponse(res, "Solo los entrenadores pueden crear tests", 403);
      }

      const test = await testService.crearTest({
        id_entrenador: idEntrenador,
        id_tipo_test,
        resul_test,
        id_usuario: id_usuario || null, // null para test básico genérico
      });

      logger.info(`Entrenador ${idEntrenador} creó un test`);
      return successResponse(res, test, "Test creado exitosamente", 201);
    } catch (error) {
      logger.error("Error al crear test:", error);
      return errorResponse(res, error.message, 400);
    }
  }

  /**
   * Obtener tests de un cliente
   */
  async obtenerTestsCliente(req, res) {
    try {
      const { id_usuario } = req.user; // cliente autenticado
      const tests = await testService.obtenerTestsCliente(id_usuario);
      return successResponse(res, tests, "Tests obtenidos correctamente");
    } catch (error) {
      logger.error("Error al obtener tests:", error);
      return errorResponse(res, error.message, 400);
    }
  }
}

export default new TestController();
