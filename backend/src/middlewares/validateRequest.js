import { errorResponse } from "../utils/responseHelper.js";

export const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((d) => d.message);
      return errorResponse(res, "Error de validación", 400, errors);
    }
    next();
  };
};
