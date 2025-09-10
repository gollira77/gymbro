import { DataTypes, Model } from "sequelize"
import { sequelize } from "../config/database.js"
import Especialidad from "./Especialidad.js"

const GENDERS = ["masculino", "femenino", "otro"]

class Entrenador extends Model {}

Entrenador.init(
  {
    id_entrenador: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: { len: [2, 50] },
    },
    apellido: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: { len: [2, 50] },
    },
    dni: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
      validate: { len: [6, 20] },
    },
    fecha_nacimiento: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: { isDate: true },
    },
    genero: {
      type: DataTypes.ENUM(...GENDERS),
      allowNull: false,
    },
    telefono: {
      type: DataTypes.STRING(20),
      allowNull: true,
      validate: { len: [6, 20] },
    },
    especialidad_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: Especialidad, key: "id_especialidad" },
    },
  },
  {
    sequelize,
    modelName: "Entrenador",
    tableName: "entrenadores",
    timestamps: true,
    hooks: {
      beforeSave: (entrenador) => {
        if (entrenador.nombre) entrenador.nombre = capitalize(entrenador.nombre)
        if (entrenador.apellido) entrenador.apellido = capitalize(entrenador.apellido)
      },
    },
  }
)

const capitalize = (str) =>
  str
    .toLowerCase()
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ")

export default Entrenador
