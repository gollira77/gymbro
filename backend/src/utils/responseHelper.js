export const successResponse = (res, data = {}, message = "Operación exitosa", status = 200) => {
  return res.status(status).json({
    success: true,
    message,
    data,
  });
};

export const errorResponse = (res, message = "Algo salió mal", status = 500, errors = null) => {
  return res.status(status).json({
    success: false,
    message,
    errors,
  });
};
