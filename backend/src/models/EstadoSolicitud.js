import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const EstadoSolicitud = sequelize.define("EstadoSolicitud", {
  id_estado_soli: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nom_soli: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  descrip_soli: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: "estados_solicitudes",
  timestamps: false
});

export default EstadoSolicitud;
