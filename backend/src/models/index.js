import { sequelize } from "../config/database.js"

import Usuario from "./Usuario.js"
import Rol from "./Rol.js"
import Cliente from "./Cliente.js"
import Entrenador from "./Entrenador.js"
import Especialidad from "./Especialidad.js"
import Test from "./Test.js"
import TipoTest from "./TipoTest.js"
import Resena from "./Resena.js"
import Notificacion from "./Notificacion.js"
import TipoNotificacion from "./TipoNotificacion.js"
import Pago from "./Pago.js"
import EstadoPago from "./EstadoPago.js"
import MetodoPago from "./MetodoPago.js"
import SolicitudRutina from "./SolicitudRutina.js"
import EstadoSolicitud from "./EstadoSolicitud.js"
import Rutina from "./Rutina.js"
import TipoRutina from "./TipoRutina.js"
import RutinaCliente from "./RutinaCliente.js"
import RutinaEjercicio from "./RutinaEjercicio.js"
import Ejercicio from "./Ejercicio.js"
import CategoriaEjercicio from "./CategoriaEjercicio.js"
import Turno from "./Turno.js"
import Sueldo from "./Sueldo.js"
import HorarioEntrenador from "./HorarioEntrenador.js"
import PreguntaTest from "./PreguntaTest.js"


const setupAssociations = () => {
  // Usuario - Rol
  Usuario.belongsTo(Rol, { foreignKey: "id_rol", as: "rol" })
  Rol.hasMany(Usuario, { foreignKey: "id_rol", as: "usuarios" })

  // Cliente - Usuario
  Cliente.belongsTo(Usuario, { foreignKey: "id_usuario", as: "usuario" })
  Usuario.hasOne(Cliente, { foreignKey: "id_usuario", as: "cliente" })

  // Entrenador - Usuario
  Entrenador.belongsTo(Usuario, { foreignKey: "id_usuario", as: "usuario" })
  Usuario.hasOne(Entrenador, { foreignKey: "id_usuario", as: "entrenador" })

  // Entrenador - Especialidad
  Entrenador.belongsTo(Especialidad, { foreignKey: "especialidad_id", as: "especialidad" })
  Especialidad.hasMany(Entrenador, { foreignKey: "especialidad_id", as: "entrenadores" })

  // Test - Usuario y TipoTest
  Test.belongsTo(Usuario, { foreignKey: "id_usuario", as: "usuario" })
  Usuario.hasMany(Test, { foreignKey: "id_usuario", as: "tests" })

  Test.belongsTo(TipoTest, { foreignKey: "id_tipo_test", as: "tipoTest" })
  TipoTest.hasMany(Test, { foreignKey: "id_tipo_test", as: "tests" })

  // Preguntas del Test - TipoTest
  PreguntaTest.belongsTo(TipoTest, { foreignKey: "id_tipo_test", as: "tipoTest" })
  TipoTest.hasMany(PreguntaTest, { foreignKey: "id_tipo_test", as: "preguntas" })


  // Reseña - Usuario
  Resena.belongsTo(Usuario, { foreignKey: "id_usuario", as: "usuario" })
  Usuario.hasMany(Resena, { foreignKey: "id_usuario", as: "resenas" })

  // Notificación - Usuario y TipoNotificacion
  Notificacion.belongsTo(Usuario, { foreignKey: "id_usuario", as: "usuario" })
  Notificacion.belongsTo(TipoNotificacion, { foreignKey: "id_tipo_not", as: "tipoNotificacion" })
  Usuario.hasMany(Notificacion, { foreignKey: "id_usuario", as: "notificaciones" })
  TipoNotificacion.hasMany(Notificacion, { foreignKey: "id_tipo_not", as: "notificaciones" })

  // Pago - Cliente, EstadoPago, MetodoPago
  Pago.belongsTo(Cliente, { foreignKey: "id_cliente", as: "cliente" })
  Pago.belongsTo(EstadoPago, { foreignKey: "id_estado", as: "estado" })
  Pago.belongsTo(MetodoPago, { foreignKey: "id_metodo", as: "metodo" })
  Cliente.hasMany(Pago, { foreignKey: "id_cliente", as: "pagos" })
  EstadoPago.hasMany(Pago, { foreignKey: "id_estado", as: "pagos" })
  MetodoPago.hasMany(Pago, { foreignKey: "id_metodo", as: "pagos" })

  // SolicitudRutina - Cliente, Rutina, EstadoSolicitud
  SolicitudRutina.belongsTo(Cliente, { foreignKey: "id_cliente", as: "cliente" })
  SolicitudRutina.belongsTo(Rutina, { foreignKey: "id_rutina", as: "rutina" })
  SolicitudRutina.belongsTo(EstadoSolicitud, { foreignKey: "id_estado_soli", as: "estado" })
  Cliente.hasMany(SolicitudRutina, { foreignKey: "id_cliente", as: "solicitudesRutina" })
  Rutina.hasMany(SolicitudRutina, { foreignKey: "id_rutina", as: "solicitudes" })
  EstadoSolicitud.hasMany(SolicitudRutina, { foreignKey: "id_estado_soli", as: "solicitudes" })

  // Rutina - Entrenador y TipoRutina
  Rutina.belongsTo(Entrenador, { foreignKey: "id_entrenador", as: "entrenador" })
  Rutina.belongsTo(TipoRutina, { foreignKey: "id_tipo_rut", as: "tipoRutina" })
  Entrenador.hasMany(Rutina, { foreignKey: "id_entrenador", as: "rutinas" })
  TipoRutina.hasMany(Rutina, { foreignKey: "id_tipo_rut", as: "rutinas" })

  // RutinaCliente - Rutina y Cliente
  RutinaCliente.belongsTo(Rutina, { foreignKey: "id_rutina", as: "rutina" })
  RutinaCliente.belongsTo(Cliente, { foreignKey: "id_cliente", as: "cliente" })
  Rutina.hasMany(RutinaCliente, { foreignKey: "id_rutina", as: "asignaciones" })
  Cliente.hasMany(RutinaCliente, { foreignKey: "id_cliente", as: "rutinasAsignadas" })

  // RutinaEjercicio - Rutina y Ejercicio
  RutinaEjercicio.belongsTo(Rutina, { foreignKey: "id_rutina", as: "rutina" })
  RutinaEjercicio.belongsTo(Ejercicio, { foreignKey: "id_ejercicio", as: "ejercicio" })
  Rutina.hasMany(RutinaEjercicio, { foreignKey: "id_rutina", as: "ejercicios" })
  Ejercicio.hasMany(RutinaEjercicio, { foreignKey: "id_ejercicio", as: "rutinas" })

  // Ejercicio - CategoriaEjercicio
  Ejercicio.belongsTo(CategoriaEjercicio, { foreignKey: "id_categoria", as: "categoria" })
  CategoriaEjercicio.hasMany(Ejercicio, { foreignKey: "id_categoria", as: "ejercicios" })

  // Turno - Cliente y RutinaCliente
  Turno.belongsTo(Cliente, { foreignKey: "id_cliente", as: "cliente" })
  Turno.belongsTo(RutinaCliente, { foreignKey: "id_rutina_cliente", as: "rutinaCliente" })
  Cliente.hasMany(Turno, { foreignKey: "id_cliente", as: "turnos" })
  RutinaCliente.hasMany(Turno, { foreignKey: "id_rutina_cliente", as: "turnos" })

  // Sueldo - Entrenador
  Sueldo.belongsTo(Entrenador, { foreignKey: "id_entrenador", as: "entrenador" })
  Entrenador.hasMany(Sueldo, { foreignKey: "id_entrenador", as: "sueldos" })

  // HorarioEntrenador - Entrenador
  HorarioEntrenador.belongsTo(Entrenador, { foreignKey: "id_entrenador", as: "entrenador" })
  Entrenador.hasMany(HorarioEntrenador, { foreignKey: "id_entrenador", as: "horarios" })
}

// Ejecutar asociaciones al cargar el index
setupAssociations()

export {
  sequelize,
  Usuario,
  Rol,
  Cliente,
  Entrenador,
  Especialidad,
  Test,
  TipoTest,
  PreguntaTest,
  Resena,
  Notificacion,
  TipoNotificacion,
  Pago,
  EstadoPago,
  MetodoPago,
  SolicitudRutina,
  EstadoSolicitud,
  Rutina,
  TipoRutina,
  RutinaCliente,
  RutinaEjercicio,
  Ejercicio,
  CategoriaEjercicio,
  Turno,
  Sueldo,
  HorarioEntrenador,
}
