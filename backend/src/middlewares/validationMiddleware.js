export const validateBody = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false, convert: true });
    if (error) {
      const detalles = error.details.map(d => d.message);
      return res.status(400).json({
        success: false,
        message: "Datos de entrada inválidos",
        errors: detalles,
      });
    }
    req.body = value;
    return next();
  };
};
