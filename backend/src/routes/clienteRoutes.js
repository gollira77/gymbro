import { Router } from "express";
import { getTestsCliente, responderTest } from "../controllers/clienteController.js";
import { authenticate, authorize } from "../middlewares/authMiddleware.js";

const router = Router();

// Obtener tests de cliente
router.get("/tests", authenticate, authorize(1), getTestsCliente);

// Responder test
router.post("/tests/:id_test/responder", authenticate, authorize(1), responderTest);

export default router;
