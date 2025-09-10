import { DataTypes, Model } from "sequelize"
import { sequelize } from "../config/database.js"

const GENDERS = ["masculino", "femenino", "otro"] // Enum dinámico, puedes expandirlo

class Cliente extends Model {}

Cliente.init(
  {
    id_cliente: {
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
    direccion: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Cliente",
    tableName: "clientes",
    timestamps: true,
    hooks: {
      beforeSave: (cliente) => {
        // Capitalizar nombre y apellido
        if (cliente.nombre) cliente.nombre = capitalize(cliente.nombre)
        if (cliente.apellido) cliente.apellido = capitalize(cliente.apellido)
      },
    },
  }
)

// Función de capitalización
const capitalize = (str) =>
  str
    .toLowerCase()
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ")

export default Cliente
