import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Resena = sequelize.define("Resena", {
  id_resena: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  mensaje_resena: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  fecha_mensaje: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: "resenas",
  timestamps: false
});

export default Resena;
