import express from "express"
import clienteRouter from "./cliente.routes.js"
import entrenadorRouter from "./entrenador.routes.js"

const router = express.Router()

router.use("/clientes", clienteRouter)
router.use("/entrenadores", entrenadorRouter)

export default router
