// src/services/clienteService.js
import { Cliente, RutinaCliente, Rutina, TipoRutina } from "../models/index.js";
import { ApiError } from "../utils/errors.js";

export const getRutinasAsignadas = async (idCliente) => {
  const cliente = await Cliente.findByPk(idCliente);
  if (!cliente) throw new ApiError("Cliente no encontrado", 404);

  const rutinas = await RutinaCliente.findAll({
    where: { id_cliente: idCliente },
    include: [
      {
        model: Rutina,
        as: "rutina",
        include: [
          {
            model: TipoRutina,
            as: "tipoRutina",
            attributes: ["id_tipo_rut", "nom_tip_rut", "descrip_tip_rut"] // 🔹 nombre correcto
          }
        ],
        attributes: ["id_rutina", "nombre_rutina", "descrip_rutina", "duracion", "fecha_creacion"]
      }
    ],
    attributes: [
      "id_rutina_cliente",
      "fecha_asignacion",
      "completada",
      "feedback",
      "descanso"
    ],
    order: [["fecha_asignacion", "DESC"]],
  });

  return rutinas;
};

export const actualizarEstadoRutina = async ({ id_rutina_cliente, completada, descanso }) => {
  const rutinaCliente = await RutinaCliente.findByPk(id_rutina_cliente);

  if (!rutinaCliente) throw new Error("RutinaCliente no encontrada");

  // Actualizamos los campos que nos pasen
  if (typeof completada === "boolean") rutinaCliente.completada = completada;
  if (descanso !== undefined) rutinaCliente.descanso = descanso;

  await rutinaCliente.save();

  return rutinaCliente;
};
