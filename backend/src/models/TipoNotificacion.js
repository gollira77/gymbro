import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const TipoNotificacion = sequelize.define("TipoNotificacion", {
  id_tipo_not: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nom_noti: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  descrip_noti: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: "tipos_notificaciones",
  timestamps: false
});

export default TipoNotificacion;
