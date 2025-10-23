import bcrypt from "bcryptjs";
import { sequelize } from "../models/index.js";
import Rol from "../models/Rol.js";
import Usuario from "../models/Usuario.js";

const seedRolesAndUsers = async () => {
  try {
    // 🔹 Array de roles con descripción
    const roles = [
      { rol: "Cliente", descrip_rol: "Usuario que utiliza los servicios del gimnasio." },
      { rol: "Entrenador", descrip_rol: "Encargado de asignar rutinas y guiar a los clientes." },
      { rol: "Administrador", descrip_rol: "Gestiona el sistema y los usuarios." },
      { rol: "Jefe", descrip_rol: "Supervisa la administración general y estadísticas." },
    ];

    // Crear roles si no existen
    for (const r of roles) {
      const [role, created] = await Rol.findOrCreate({
        where: { rol: r.rol },
        defaults: r,
      });
      if (created) console.log(`✅ Rol creado: ${role.rol}`);
    }

    // 🔹 Array de usuarios de prueba
    const usuarios = [
      { email: "cliente@gymbro.com", rol: "Cliente" },
      { email: "entrenador@gymbro.com", rol: "Entrenador" },
      { email: "admin@gymbro.com", rol: "Administrador" },
      { email: "jefe@gymbro.com", rol: "Jefe" },
    ];

    const passwordPlain = "123456";
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(passwordPlain, salt);

    for (const u of usuarios) {
      const role = await Rol.findOne({ where: { rol: u.rol } });
      if (!role) {
        console.error(`❌ Rol no encontrado para usuario ${u.email}`);
        continue;
      }

      const [usuario, created] = await Usuario.findOrCreate({
        where: { email: u.email },
        defaults: {
          email: u.email,
          password: hashedPassword,
          id_rol: role.id_rol,
          activo: true,
          fecha_alta: new Date(),
          fecha_actualizacion: new Date(),
        },
      });

      if (created) console.log(`✅ Usuario creado: ${usuario.email} (Rol: ${u.rol})`);
    }

    console.log("🎉 Seeder completado correctamente");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error ejecutando el seeder:", err);
    process.exit(1);
  }
};

// Ejecutar solo si se llama directamente
if (import.meta.url === process.argv[1] || process.argv[1].includes("seedRoles.js")) {
  sequelize.authenticate()
    .then(() => seedRolesAndUsers())
    .catch((err) => {
      console.error("❌ No se pudo conectar a la BD:", err);
      process.exit(1);
    });
}

export default seedRolesAndUsers;
