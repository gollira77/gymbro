import express from "express"
import cors from "cors"
import helmet from "helmet"
import rateLimit from "express-rate-limit"
import dotenv from "dotenv"
import { sequelize } from "./config/database.js"
import routes from "./routes/index.js"
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js"
import { logger } from "./utils/logger.js"
import { successResponse } from "./utils/responseHelper.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

// ---------------------------
// Middlewares de seguridad
// ---------------------------
app.use(helmet())
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
)

// ---------------------------
// Rate limiting
// ---------------------------
// Limite general para la API
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100,
  message: "Demasiadas solicitudes, intenta de nuevo más tarde",
})
app.use(generalLimiter)

// Limite más estricto para login
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5,
  message: "Demasiados intentos de login, espera 15 minutos",
})
app.use("/api/auth/login", loginLimiter)

// ---------------------------
// Middlewares de parsing
// ---------------------------
app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ extended: true }))

// ---------------------------
// Logging de requests (seguro)
// ---------------------------
app.use((req, res, next) => {
  // No loggear body completo para seguridad, solo método y path
  logger.info(`${req.method} ${req.path} - ${req.ip}`)
  next()
})

// ---------------------------
// Rutas principales
// ---------------------------
app.use("/api", routes)

// ---------------------------
// Health check estandarizado
// ---------------------------
app.get("/health", (req, res) => {
  return successResponse(res, { status: "OK" }, "GymBro API funcionando correctamente")
})

// ---------------------------
// Middlewares de manejo de errores
// ---------------------------
app.use(notFound)
app.use(errorHandler)

// ---------------------------
// Inicialización del servidor
// ---------------------------
const startServer = async () => {
  try {
    // Conexión a la base de datos
    await sequelize.authenticate()
    logger.info("Conexión a la base de datos establecida correctamente")

    // Sincronización DB en desarrollo
    if (process.env.NODE_ENV === "development") {
      await sequelize.sync({ alter: true })
      logger.info("Modelos sincronizados con la base de datos")
    } else {
      logger.info("En producción, usar migraciones en lugar de sync({ alter: true })")
    }

    app.listen(PORT, () => {
      logger.info(`Servidor GymBro ejecutándose en puerto ${PORT}`)
      logger.info(`Ambiente: ${process.env.NODE_ENV || "development"}`)
    })
  } catch (error) {
    logger.error("Error al inicializar el servidor:", { error: error.message })
    process.exit(1)
  }
}

startServer()
