import { Router } from "express";
import testController from "../controllers/testController.js";
import { body } from "express-validator";
import { authenticate, authorize } from "../middlewares/authMiddleware.js";

const router = Router();

// Crear test (básico o avanzado) - Solo entrenadores
router.post(
  "/test",
  authenticate,
  authorize(2), // solo entrenadores
  [
    body("id_tipo_test")
      .notEmpty().withMessage("El id del tipo de test es obligatorio")
      .isInt().withMessage("Debe ser un número válido"),
    body("resul_test")
      .optional()
      .isString().withMessage("resul_test debe ser un string"),
    body("id_usuario")
      .optional()
      .isInt().withMessage("id_usuario debe ser un número válido"),
  ],
  testController.crearTest
);

export default router;
