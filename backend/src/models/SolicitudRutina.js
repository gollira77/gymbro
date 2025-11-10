import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const SolicitudRutina = sequelize.define("SolicitudRutina", {
  id_solicitud: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_cliente: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  id_rutina: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  id_estado_soli: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  fecha_solicitud: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  observaciones: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: "solicitudes_rutinas",
  timestamps: false
});

export default SolicitudRutina;
