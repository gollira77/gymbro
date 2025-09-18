# GymBro Backend API

Backend completo para la aplicación de gestión de gimnasio GymBro, desarrollado con Node.js, Express, Sequelize y MySQL.

## 🚀 Características

- **Autenticación JWT** completa con registro, login y recuperación de contraseña
- **Autorización por roles** (Admin, Jefe, Entrenador, Cliente)
- **CRUD completo** para todos los recursos del gimnasio
- **Gestión de rutinas y ejercicios** con asignación automática
- **Sistema de pagos** con múltiples métodos y estados
- **Notificaciones** automáticas por email
- **Tests de rendimiento** para clientes
- **Estadísticas** completas para administración
- **Manejo de errores** robusto y logging
- **Validaciones** exhaustivas con Joi
- **Respuestas estandarizadas** de API

## 📋 Requisitos

- Node.js >= 14.0.0
- MySQL >= 5.7
- npm o yarn

## 🛠️ Instalación

1. **Clonar el repositorio**
\`\`\`bash
git clone <repository-url>
cd gymbro-backend
\`\`\`

2. **Instalar dependencias**
\`\`\`bash
npm install
\`\`\`

3. **Configurar variables de entorno**
\`\`\`bash
cp .env.example .env
# Editar .env con tus configuraciones
\`\`\`

4. **Crear base de datos**
\`\`\`sql
CREATE DATABASE gymbro_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
\`\`\`

5. **Ejecutar migraciones**
\`\`\`bash
npm run migrate
\`\`\`

6. **Ejecutar seeders (opcional)**
\`\`\`bash
npm run seed
\`\`\`

## 🚀 Uso

### Desarrollo
\`\`\`bash
npm run dev
\`\`\`

### Producción
\`\`\`bash
npm start
\`\`\`

## 📚 Documentación de API

### Autenticación

#### POST /api/auth/login
Iniciar sesión de usuario.

**Request:**
\`\`\`json
{
  "email": "usuario@example.com",
  "password": "password123"
}
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "message": "Inicio de sesión exitoso",
  "data": {
    "token": "jwt_token_here",
    "usuario": {
      "id": 1,
      "email": "usuario@example.com",
      "rol": "cliente",
      "datosAdicionales": {...}
    }
  }
}
\`\`\`

#### POST /api/auth/register
Registrar nuevo usuario.

**Request:**
\`\`\`json
{
  "email": "nuevo@example.com",
  "password": "password123",
  "id_rol": 2,
  "datosPersonales": {
    "nom_cliente": "Juan",
    "ape_cliente": "Pérez",
    "dni_cliente": "12345678",
    "fecha_nacimiento_cliente": "1990-01-01",
    "genero_cliente": "M"
  }
}
\`\`\`

### Perfil

POST /perfil (con el JWT)

Si el usuario es cliente (id_rol = 1), mandás:
\`\`\`json
{
  "nombre": "Diego",
  "apellido": "Pérez",
  "dni": "12345678",
  "fecha_nacimiento": "1990-01-01",
  "genero": "masculino",
  "telefono": "111222333",
  "direccion": "Calle Falsa 123"
}


Si el usuario es entrenador (id_rol = 2), mandás lo mismo + especialidad_id.
\`\`\`

### Clientes

#### GET /api/clientes
Obtener lista de clientes (requiere autenticación).

**Headers:**
\`\`\`
Authorization: Bearer <jwt_token>
\`\`\`

**Query Parameters:**
- `page`: Número de página (default: 1)
- `limit`: Elementos por página (default: 10)
- `search`: Búsqueda por nombre o DNI

#### POST /api/clientes
Crear nuevo cliente.

**Request:**
\`\`\`json
{
  "nom_cliente": "María",
  "ape_cliente": "García",
  "dni_cliente": "87654321",
  "fecha_nacimiento_cliente": "1985-05-15",
  "telefono_cliente": "+1234567890",
  "genero_cliente": "F",
  "altura_cliente": 1.65,
  "peso_cliente": 60.5
}
\`\`\`

### Rutinas

#### GET /api/rutinas
Obtener rutinas disponibles.

#### POST /api/rutinas
Crear nueva rutina (solo entrenadores).

**Request:**
\`\`\`json
{
  "nombre_rutina": "Rutina de Fuerza",
  "descrip_rutina": "Rutina enfocada en desarrollo de fuerza",
  "id_entrenador": 1,
  "id_tipo_rut": 1,
  "duracion": 60,
  "ejercicios": [
    {
      "id_ejercicio": 1,
      "series": 3,
      "repeticiones": 10,
      "orden": 1
    }
  ]
}
\`\`\`

#### POST /api/rutinas/:id/asignar
Asignar rutina a cliente.

**Request:**
\`\`\`json
{
  "id_cliente": 1,
  "observaciones": "Rutina personalizada para principiante"
}
\`\`\`

### Ejercicios

#### GET /api/ejercicios
Obtener lista de ejercicios.

#### POST /api/ejercicios
Crear nuevo ejercicio.

**Request:**
\`\`\`json
{
  "nom_ejercicio": "Press de banca",
  "descrip_ejercicio": "Ejercicio para pecho y tríceps",
  "id_categoria": 1,
  "imagen": "url_imagen",
  "video_url": "url_video"
}
\`\`\`

### Pagos

#### GET /api/pagos
Obtener historial de pagos.

#### POST /api/pagos
Registrar nuevo pago.

**Request:**
\`\`\`json
{
  "id_cliente": 1,
  "monto": 50.00,
  "id_metodo": 1,
  "id_estado": 1,
  "registrado_por": 1
}
\`\`\`

### Estadísticas

#### GET /api/estadisticas/dashboard
Obtener estadísticas del dashboard.

**Response:**
\`\`\`json
{
  "success": true,
  "data": {
    "totalClientes": 150,
    "clientesActivos": 120,
    "ingresosMes": 15000,
    "pagosPendientes": 25,
    "rutinasCreadas": 45,
    "testRealizados": 89
  }
}
\`\`\`

## 🔐 Roles y Permisos

### Admin/Jefe
- Acceso completo a todas las funcionalidades
- Gestión de usuarios y roles
- Visualización de estadísticas completas
- Gestión de pagos y sueldos

### Entrenador
- Crear y gestionar rutinas
- Asignar rutinas a clientes
- Ver progreso de clientes asignados
- Gestionar ejercicios

### Cliente
- Ver rutinas asignadas
- Marcar rutinas como completadas
- Realizar tests de rendimiento
- Solicitar rutinas personalizadas
- Ver historial de pagos

## 🗂️ Estructura del Proyecto

\`\`\`
src/
├── config/          # Configuraciones (DB, etc.)
├── controllers/     # Controladores de rutas
├── middlewares/     # Middlewares personalizados
├── models/          # Modelos de Sequelize
├── routes/          # Definición de rutas
├── services/        # Lógica de negocio
├── utils/           # Utilidades y helpers
└── server.js        # Punto de entrada
\`\`\`

## 🧪 Testing

\`\`\`bash
npm test
\`\`\`

## 📝 Logging

Los logs se guardan en:
- `logs/app.log` - Logs generales
- `logs/error.log` - Solo errores

## 🔧 Configuración de Producción

1. Configurar variables de entorno de producción
2. Usar un proceso manager como PM2
3. Configurar proxy reverso (Nginx)
4. Habilitar HTTPS
5. Configurar backup de base de datos

## 🤝 Contribución

1. Fork el proyecto
2. Crear rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.