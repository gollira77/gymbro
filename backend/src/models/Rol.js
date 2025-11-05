import { DataTypes } from "sequelize"
import { sequelize } from "../config/database.js"

const Rol = sequelize.define(
  "roles",
  {
    id_rol: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    rol: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    descrip_rol: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "roles",
    timestamps: false,
  },
)

export default Rol