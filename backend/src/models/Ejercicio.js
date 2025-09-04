import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Ejercicio = sequelize.define("Ejercicio", {
  id_ejercicio: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nom_ejercicio: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descrip_ejercicio: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  imagen: {
    type: DataTypes.STRING,
    allowNull: true
  },
  video_url: {
    type: DataTypes.STRING,
    allowNull: true
  },
  id_categoria: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: "ejercicios",
  timestamps: false
});

export default Ejercicio;
