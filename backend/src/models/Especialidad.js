import { DataTypes } from "sequelize"
import { sequelize } from "../config/database.js"

const Especialidad = sequelize.define(
  "especialidades",
  {
    id_especialidad: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nom_especialidad: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    descrip_especialidad: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "especialidades",
    timestamps: false,
  },
)

export default Especialidad
