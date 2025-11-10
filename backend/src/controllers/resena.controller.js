import Resena from "../models/Resena.js";
import Cliente from "../models/Cliente.js";
import Usuario from "../models/Usuario.js";

// POST /api/clientes/:id/resenas
export const crearResena = async (req, res) => {
  try {
    const { id } = req.params;
    const { mensaje_resena, puntuacion } = req.body;

    const existeCliente = await Cliente.findByPk(id);
    if (!existeCliente) {
      return res.status(404).json({
        success: false,
        message: "Cliente no encontrado",
      });
    }

    const nuevaResena = await Resena.create({
      id_cliente: id,
      mensaje_resena,
      puntuacion,
    });

    return res.status(201).json({
      success: true,
      message: "Reseña guardada correctamente",
      data: nuevaResena,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error al guardar reseña",
      error: error.message,
    });
  }
};

// GET /api/resenas/all
export const obtenerResenas = async (req, res) => {
  try {
    const resenas = await Resena.findAll({
      include: [
        {
          model: Usuario,
          as: "usuario",
          attributes: ["email"],
          include: [
            {
              model: Cliente,
              as: "cliente",
              attributes: ["nombre", "apellido"]
            }
          ]
        }
      ],
      order: [["fecha_mensaje", "DESC"]],
    });

    return res.json({
      success: true,
      data: resenas,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error al obtener reseñas",
      error: error.message,
    });
  }
};