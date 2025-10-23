import express from "express"
import {
  crearCliente,
  listarClientes,
  obtenerClientePorId,
  actualizarCliente,
  eliminarCliente,
} from "../controllers/cliente.controller.js"

const router = express.Router()

router.post("/", crearCliente)
router.get("/", listarClientes)
router.get("/:id", obtenerClientePorId)
router.put("/:id", actualizarCliente)
router.delete("/:id", eliminarCliente)

export default router
