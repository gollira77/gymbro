import express from "express"
import clienteRouter from "./cliente.routes.js"

const router = express.Router()

router.use("/clientes", clienteRouter)

export default router
