import { DataTypes } from "sequelize"
import { sequelize } from "../config/database.js"

const Entrenador = sequelize.define(
  "entrenadores",
  {
    id_entrenador: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_especialidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "especialidades",
        key: "id_especialidad",
      },
    },
    nom_entrenador: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    ape_entrenador: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    dni_entrenador: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
    fecha_nacimiento_entrenador: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    telefono_entrenador: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    direccion_entrenador: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    fecha_alta_entrenador: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "entrenadores",
    timestamps: true,
    createdAt: "fecha_alta_entrenador",
    updatedAt: "fecha_actualizacion",
  },
)

export default Entrenador
