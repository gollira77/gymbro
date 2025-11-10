import { Entrenador, Rutina, TipoRutina, Cliente, RutinaCliente, RutinaEjercicio, Ejercicio, SolicitudRutina, EstadoSolicitud } from "../models/index.js";

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



// POST /api/entrenadores/:id/rutinas/:idRutina/ejercicios
export const agregarEjercicioARutina = async (req, res) => {
  try {
    const { id, idRutina } = req.params;
    const { id_ejercicio, series, repeticiones, orden } = req.body;

    //  Verificar entrenador
    const entrenador = await Entrenador.findByPk(id);
    if (!entrenador)
      return res.status(404).json({ success: false, message: "Entrenador no encontrado" });

    //  Verificar rutina del entrenador
    const rutina = await Rutina.findOne({ where: { id_rutina: idRutina, id_entrenador: id } });
    if (!rutina)
      return res.status(403).json({
        success: false,
        message: "La rutina no pertenece a este entrenador",
      });

    //  Verificar ejercicio existente
    const ejercicio = await Ejercicio.findByPk(id_ejercicio);
    if (!ejercicio)
      return res.status(404).json({ success: false, message: "Ejercicio no encontrado" });

    //  Verificar si ya existe en la rutina
    const existente = await RutinaEjercicio.findOne({
      where: { id_rutina: idRutina, id_ejercicio },
    });
    if (existente)
      return res
        .status(400)
        .json({ success: false, message: "El ejercicio ya está en esta rutina" });

    //  Crear asociación
    const nuevo = await RutinaEjercicio.create({
      id_rutina: idRutina,
      id_ejercicio,
      series,
      repeticiones,
      orden,
    });

    res.status(201).json({
      success: true,
      message: "Ejercicio agregado correctamente a la rutina",
      data: nuevo,
    });
  } catch (error) {
    console.error("Error agregando ejercicio:", error);
    res.status(500).json({
      success: false,
      message: "Error al agregar ejercicio a la rutina",
      error: error.message,
    });
  }
};

//  DELETE /api/entrenadores/:id/rutinas/:idRutina/ejercicios/:idEjercicio
export const eliminarEjercicioDeRutina = async (req, res) => {
  try {
    const { id, idRutina, idEjercicio } = req.params;

    //  Verificar que la rutina pertenece al entrenador
    const rutina = await Rutina.findOne({ where: { id_rutina: idRutina, id_entrenador: id } });
    if (!rutina)
      return res.status(403).json({
        success: false,
        message: "La rutina no pertenece a este entrenador",
      });

    //  Buscar el registro en la tabla intermedia
    const registro = await RutinaEjercicio.findOne({
      where: { id_rutina: idRutina, id_ejercicio: idEjercicio },
    });

    if (!registro)
      return res.status(404).json({
        success: false,
        message: "El ejercicio no está asociado a esta rutina",
      });

    //  Eliminar la relación
    await registro.destroy();

    res.json({
      success: true,
      message: "Ejercicio eliminado de la rutina correctamente",
    });
  } catch (error) {
    console.error("Error eliminando ejercicio:", error);
    res.status(500).json({
      success: false,
      message: "Error interno del servidor",
      error: error.message,
    });
  }
};



// ✅ GET /api/entrenadores/:id/solicitudes-rutinas
export const verSolicitudesRutinas = async (req, res) => {
  try {
    const { id } = req.params;

    const entrenador = await Entrenador.findByPk(id);
    if (!entrenador)
      return res.status(404).json({ success: false, message: "Entrenador no encontrado" });

    const solicitudes = await SolicitudRutina.findAll({
      include: [
        {
          model: Cliente,
          as: "cliente",
          attributes: ["id_cliente", "nombre", "apellido"]
        },
        {
          model: EstadoSolicitud,
          as: "estado",
          attributes: ["nom_soli"]
        },
        {
          model: Rutina,
          as: "rutina",
          required: false, // 🔑 LEFT JOIN (permite id_rutina = NULL)
          attributes: ["id_rutina", "nombre_rutina", "id_entrenador"]
        }
      ],
      order: [["fecha_solicitud", "DESC"]]
    });

    // 🔍 Filtrar solo las solicitudes relevantes
    const filtradas = solicitudes.filter(s => {
      // Mostrar si NO tiene rutina asignada (pendiente)
      if (!s.rutina) return true;
      // O si la rutina pertenece al entrenador actual
      return s.rutina.id_entrenador === Number(id);
    });

    if (!filtradas.length) {
      return res.status(200).json({
        success: true,
        message: "No hay solicitudes de rutinas personalizadas para este entrenador",
        data: []
      });
    }

    const resultado = filtradas.map(s => ({
      id_solicitud: s.id_solicitud,
      cliente: `${s.cliente.nombre} ${s.cliente.apellido}`,
      rutina: s.rutina?.nombre_rutina || "Sin rutina asignada",
      observaciones: s.observaciones,
      fecha_solicitud: s.fecha_solicitud,
      estado: s.estado.nom_soli
    }));

    return res.json({
      success: true,
      message: "Solicitudes obtenidas correctamente",
      data: resultado
    });
  } catch (error) {
    console.error("Error al obtener solicitudes:", error);
    res.status(500).json({
      success: false,
      message: "Error interno al obtener solicitudes de rutinas",
      error: error.message
    });
  }
};
