import { DataTypes } from "sequelize"
import { sequelize } from "../config/database.js"

const Usuario = sequelize.define(
  "usuarios",
  {
    id_usuario: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: { msg: "Debe ser un email válido" },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id_rol: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "roles",
        key: "id_rol",
      },
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    token_recuperacion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fecha_expiracion_token: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "usuarios",
    timestamps: true,
    createdAt: "fecha_alta",
    updatedAt: "fecha_actualizacion",
  }
)

export default Usuario
