// src/models/TipoRutina.js
import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const TipoRutina = sequelize.define("TipoRutina", {
  id_tipo_rut: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nom_tip_rut: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descrip_tip_rut: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: "tipos_rutinas",
  timestamps: false
});

export default TipoRutina;
