import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Notificacion = sequelize.define("Notificacion", {
  id_notificacion: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  id_tipo_not: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  mensaje_noti: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  leido: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  fecha_envio: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: "notificaciones",
  timestamps: false
});

export default Notificacion;
