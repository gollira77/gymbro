import { validationResult } from "express-validator"
import { errorResponse } from "../utils/responseHelper.js"

export const validateRequest = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return errorResponse(res, "Errores de validación", 400, errors.array())
  }
  next()
}
