import Test from "../models/Test.js";

export const crearTestBasico = async ({ id_usuario, id_tipo_test, respuestas }) => {
  // Guardamos las respuestas como JSON en resul_test
  const test = await Test.create({
    id_usuario,
    id_tipo_test,
    resul_test: JSON.stringify(respuestas)
  });

  return test;
};
