import { Entrenador, Rutina, TipoRutina, Cliente, RutinaCliente } from "../models/index.js";

// GET /api/entrenadores/:id/rutinas
export const obtenerRutinasEntrenador = async (req, res) => {
  try {
    const { id } = req.params;

    // Validar existencia del entrenador
    const entrenador = await Entrenador.findByPk(id);
    if (!entrenador) {
      return res.status(404).json({
        success: false,
        message: "Entrenador no encontrado",
      });
    }

    // Buscar rutinas creadas por este entrenador
    const rutinas = await Rutina.findAll({
      where: { id_entrenador: id },
      include: [
        {
          model: TipoRutina,
          as: "tipoRutina",
          attributes: ["nom_tip_rut", "descrip_tip_rut"],
        },
      ],
      order: [["fecha_creacion", "DESC"]],
    });

    // Si no hay rutinas creadas
    if (rutinas.length === 0) {
      return res.status(200).json({
        success: true,
        message: "El entrenador no tiene rutinas registradas",
        data: [],
      });
    }

    // Devolver resultado
    return res.status(200).json({
      success: true,
      data: rutinas,
    });

  } catch (error) {
    console.error("Error al obtener rutinas:", error);
    return res.status(500).json({
      success: false,
      message: "Error interno del servidor",
      error: error.message,
    });
  }
};



// POST /api/entrenadores/:id/asignar-rutina
export const asignarRutinaACliente = async (req, res) => {
  try {
    const { id } = req.params; // id del entrenador
    const { id_cliente, id_rutina } = req.body;

    //  Verificar que el entrenador exista
    const entrenador = await Entrenador.findByPk(id);
    if (!entrenador) {
      return res.status(404).json({ success: false, message: "Entrenador no encontrado" });
    }

    //  Verificar que la rutina exista y pertenezca al entrenador
    const rutina = await Rutina.findOne({
      where: { id_rutina, id_entrenador: id },
    });
    if (!rutina) {
      return res.status(400).json({
        success: false,
        message: "La rutina no existe o no pertenece a este entrenador",
      });
    }

    //  Verificar que el cliente exista
    const cliente = await Cliente.findByPk(id_cliente);
    if (!cliente) {
      return res.status(404).json({ success: false, message: "Cliente no encontrado" });
    }

    //  Evitar duplicar asignaciones
    const existente = await RutinaCliente.findOne({
      where: { id_rutina, id_cliente },
    });
    if (existente) {
      return res.status(400).json({
        success: false,
        message: "Este cliente ya tiene asignada esta rutina",
      });
    }

    //  Crear nueva asignación
    const nuevaAsignacion = await RutinaCliente.create({
      id_rutina,
      id_cliente,
      completada: false,
      fecha_asignacion: new Date(),
    });

    return res.status(201).json({
      success: true,
      message: "Rutina asignada correctamente",
      data: nuevaAsignacion,
    });

  } catch (error) {
    console.error("Error asignando rutina:", error);
    return res.status(500).json({
      success: false,
      message: "Error interno del servidor",
      error: error.message,
    });
  }
};


// POST /api/entrenadores/:id/rutinas
export const crearRutina = async (req, res) => {
  try {
    const { id } = req.params; // id del entrenador
    const { nombre_rutina, descrip_rutina, id_tipo_rut, duracion } = req.body;

    //  Validar que el entrenador exista
    const entrenador = await Entrenador.findByPk(id);
    if (!entrenador) {
      return res.status(404).json({ success: false, message: "Entrenador no encontrado" });
    }

    //  Validar que el tipo de rutina exista
    const tipo = await TipoRutina.findByPk(id_tipo_rut);
    if (!tipo) {
      return res.status(400).json({ success: false, message: "Tipo de rutina no válido" });
    }

    //  Crear nueva rutina
    const nuevaRutina = await Rutina.create({
      nombre_rutina,
      descrip_rutina,
      id_entrenador: id,
      id_tipo_rut,
      duracion
    });

    //  Devolver respuesta
    return res.status(201).json({
      success: true,
      message: "Rutina creada correctamente",
      data: {
        ...nuevaRutina.toJSON(),
        tipoRutina: tipo.nom_tip_rut
      }
    });

  } catch (error) {
    console.error("Error creando rutina:", error);
    return res.status(500).json({
      success: false,
      message: "Error interno del servidor",
      error: error.message
    });
  }
};
