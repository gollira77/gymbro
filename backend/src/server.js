/**
 * Servidor principal de la aplicación GymBro
 * Configura Express, middlewares globales y rutas principales
 */

const express = require("express")
const cors = require("cors")
const helmet = require("helmet")
const rateLimit = require("express-rate-limit")
require("dotenv").config()

const { sequelize } = require("./config/database")
const routes = require("./routes")
const { errorHandler, notFound } = require("./middlewares/errorMiddleware")
const { logger } = require("./utils/logger")

const app = express()
const PORT = process.env.PORT || 3000

// Middlewares de seguridad
app.use(helmet())
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  }),
)

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // máximo 100 requests por ventana de tiempo
  message: "Demasiadas solicitudes desde esta IP, intenta de nuevo más tarde.",
})
app.use(limiter)

// Middlewares de parsing
app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ extended: true }))

// Logging de requests
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path} - ${req.ip}`)
  next()
})

// Rutas principales
app.use("/api", routes)

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "GymBro API funcionando correctamente",
    timestamp: new Date().toISOString(),
  })
})

// Middlewares de manejo de errores
app.use(notFound)
app.use(errorHandler)

// Inicialización del servidor
const startServer = async () => {
  try {
    // Verificar conexión a la base de datos
    await sequelize.authenticate()
    logger.info("Conexión a la base de datos establecida correctamente")

    // Sincronizar modelos (solo en desarrollo)
    if (process.env.NODE_ENV === "development") {
      await sequelize.sync({ alter: true })
      logger.info("Modelos sincronizados con la base de datos")
    }

    app.listen(PORT, () => {
      logger.info(`Servidor GymBro ejecutándose en puerto ${PORT}`)
      logger.info(`Ambiente: ${process.env.NODE_ENV || "development"}`)
    })
  } catch (error) {
    logger.error("Error al inicializar el servidor:", error)
    process.exit(1)
  }
}

startServer()

module.exports = app