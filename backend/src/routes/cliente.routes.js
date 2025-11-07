import express from "express"
import {
  crearCliente,
  listarClientes,
  obtenerClientePorId,
  actualizarCliente,
  eliminarCliente,
  obtenerRutinasAsignadas,
  marcarRutina,
  realizarTestBasico
} from "../controllers/cliente.controller.js"
import { responderTestBasico } from "../controllers/test.controller.js";

const router = express.Router()

router.post("/", crearCliente);
router.get("/", listarClientes);
router.get("/:id", obtenerClientePorId);
router.put("/:id", actualizarCliente);
router.delete("/:id", eliminarCliente);
router.get("/:id/rutinas", obtenerRutinasAsignadas);
router.patch("/rutina/estado", marcarRutina);
router.post("/test/basico"), realizarTestBasico;
router.post("/:id/responder-test-basico", responderTestBasico);

export default router
