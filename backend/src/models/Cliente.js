import { DataTypes } from "sequelize"
import { sequelize } from "../config/database.js"

const Cliente = sequelize.define(
  "clientes",
  {
    id_cliente: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "usuarios",
        key: "id_usuario",
      },
    },
    nom_cliente: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    ape_cliente: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    dni_cliente: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
    fecha_nacimiento_cliente: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    telefono_cliente: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    direccion_cliente: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    altura_cliente: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
      comment: "Altura en metros",
    },
    peso_cliente: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
      comment: "Peso en kilogramos",
    },
    genero_cliente: {
      type: DataTypes.ENUM("M", "F", "Otro"),
      allowNull: false,
    },
    fecha_alta: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "clientes",
    timestamps: true,
    createdAt: "fecha_alta",
    updatedAt: "fecha_actualizacion",
  },
)

export default Cliente
