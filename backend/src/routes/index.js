import express from "express"
const router = express.Router()

import authRoutes from "./authRoutes.js"
import adminRoutes from "./adminRoutes.js"
import perfilRoutes from "./perfilRoutes.js"

router.use("/auth", authRoutes)
router.use("/admin", adminRoutes) 
router.use("/perfil", perfilRoutes)

export default router





