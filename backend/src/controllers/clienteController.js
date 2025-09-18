import * as testService from "../services/testService.js";
import { successResponse, errorResponse } from "../utils/responseHelper.js";
import { logger } from "../utils/logger.js";

// Obtener tests de un cliente
export const getTestsCliente = async (req, res) => {
  try {
    const id_usuario = req.user.id; // viene de authenticate
    const tests = await testService.obtenerTestsCliente(id_usuario);
    return successResponse(res, tests, "Tests obtenidos correctamente");
  } catch (error) {
    logger.error("Error al obtener tests:", error);
    return errorResponse(res, error.message, 500);
  }
};

// Responder un test
export const responderTest = async (req, res) => {
  try {
    const { id_usuario, rol } = req.user;

    if (rol !== 1) {
      return errorResponse(res, "Solo los clientes pueden responder tests", 403);
    }

    const { id_test } = req.params;
    const { resul_test } = req.body;

    const test = await testService.responderTest({
      id_test,
      id_usuario,
      resul_test,
    });

    logger.info(`Cliente ${id_usuario} respondió test ${id_test}`);
    return successResponse(res, test, "Test respondido correctamente");
  } catch (error) {
    logger.error("Error al responder test:", error);
    return errorResponse(res, error.message, 400);
  }
};
