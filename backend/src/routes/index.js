import express from "express"
const router = express.Router()

import authRoutes from "./authRoutes.js"
import adminRoutes from "./adminRoutes.js"

router.use("/auth", authRoutes)
router.use("/admin", adminRoutes) 

export default router
