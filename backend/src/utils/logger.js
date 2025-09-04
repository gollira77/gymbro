/**
 * Sistema de logging para la aplicación
 */

import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

// Necesario para __dirname en ESM
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Crear directorio de logs si no existe
const logsDir = path.join(__dirname, "../../logs")
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true })
}

class Logger {
  constructor() {
    this.logFile = path.join(logsDir, "app.log")
    this.errorFile = path.join(logsDir, "error.log")
  }

  /**
   * Formatear mensaje de log
   */
  formatMessage(level, message, meta = {}) {
    const timestamp = new Date().toISOString()
    const metaString = Object.keys(meta).length > 0 ? JSON.stringify(meta) : ""
    return `[${timestamp}] ${level.toUpperCase()}: ${message} ${metaString}\n`
  }

  /**
   * Escribir log a archivo
   */
  writeToFile(filename, message) {
    fs.appendFileSync(filename, message)
  }

  info(message, meta = {}) {
    const formattedMessage = this.formatMessage("info", message, meta)
    console.log(formattedMessage.trim())
    this.writeToFile(this.logFile, formattedMessage)
  }

  error(message, meta = {}) {
    const formattedMessage = this.formatMessage("error", message, meta)
    console.error(formattedMessage.trim())
    this.writeToFile(this.errorFile, formattedMessage)
    this.writeToFile(this.logFile, formattedMessage)
  }

  warn(message, meta = {}) {
    const formattedMessage = this.formatMessage("warn", message, meta)
    console.warn(formattedMessage.trim())
    this.writeToFile(this.logFile, formattedMessage)
  }

  debug(message, meta = {}) {
    if (process.env.NODE_ENV === "development") {
      const formattedMessage = this.formatMessage("debug", message, meta)
      console.log(formattedMessage.trim())
      this.writeToFile(this.logFile, formattedMessage)
    }
  }
}

export const logger = new Logger()
