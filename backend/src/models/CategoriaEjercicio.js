import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const CategoriaEjercicio = sequelize.define("CategoriaEjercicio", {
  id_categoria: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nom_categoria: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descrip_categoria: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: "categorias_ejercicios",
  timestamps: false
});

export default CategoriaEjercicio;
