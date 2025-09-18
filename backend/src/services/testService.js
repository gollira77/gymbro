import { Test, TipoTest } from "../models/index.js";

/**
 * Responder un test
 */
export const responderTest = async ({ id_test, id_usuario, resul_test }) => {
  const test = await Test.findOne({ where: { id_test, id_usuario } });
  if (!test) throw new Error("Test no encontrado para este usuario");

  test.resul_test = resul_test;
  await test.save();
  return test;
};

/**
 * Crear un test (solo entrenador)
 */
export const crearTest = async ({ id_entrenador, id_tipo_test, resul_test, id_usuario }) => {
  const test = await Test.create({
    id_usuario,      // null = test básico genérico
    id_tipo_test,
    resul_test,
  });
  return test;
};

/**
 * Obtener test básico genérico
 */
export const obtenerTestBasico = async () => {
  const tipoBasico = await TipoTest.findOne({ where: { nom_test: "Basico" } });
  if (!tipoBasico) throw new Error("No se encontró el test básico.");
  return tipoBasico;
};

/**
 * Asignar test básico a un cliente
 */
export const asignarTestBasicoCliente = async (id_usuario) => {
  const tipoBasico = await obtenerTestBasico();
  const [test] = await Test.findOrCreate({
    where: { id_usuario, id_tipo_test: tipoBasico.id_tipo_test },
    defaults: { resul_test: null }
  });
  return test;
};

/**
 * Obtener tests de un cliente
 */
export const obtenerTestsCliente = async (id_usuario) => {
  const tests = await Test.findAll({
    where: { id_usuario },
    include: [{ model: TipoTest, as: "tipoTest" }],
  });
  return tests;
};
