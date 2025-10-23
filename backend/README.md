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
node src/seeders/seedRoles.js

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
  "email": "nuevo@example.com",
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

Obtener todos los clientes
GET /api/clientes

Descripción: Devuelve la lista completa de clientes registrados.

Request: Ninguno

Response:

{
  "success": true,
  "data": [
    {
      "id_cliente": 1,
      "id_usuario": 1,
      "nombre": "Juan",
      "apellido": "Pérez",
      "dni": "12345678",
      "fecha_nacimiento": "1990-01-01",
      "genero": "M",
      "telefono": "123456789",
      "direccion": "Calle Falsa 123"
    },
    {
      "id_cliente": 2,
      "id_usuario": 2,
      "nombre": "María",
      "apellido": "Gómez",
      "dni": "87654321",
      "fecha_nacimiento": "1992-05-15",
      "genero": "F",
      "telefono": "987654321",
      "direccion": "Avenida Siempre Viva 456"
    }
  ]
}

Obtener un cliente por ID
GET /api/clientes/:id

Descripción: Devuelve los datos de un cliente específico por su ID.

Request:

id → ID del cliente en la URL

Response:

{
  "success": true,
  "data": {
    "id_cliente": 1,
    "id_usuario": 1,
    "nombre": "Juan",
    "apellido": "Pérez",
    "dni": "12345678",
    "fecha_nacimiento": "1990-01-01",
    "genero": "M",
    "telefono": "123456789",
    "direccion": "Calle Falsa 123"
  }
}

Crear un cliente
POST /api/clientes

Descripción: Crea un nuevo cliente asociado a un usuario existente.

Request:

{
  "id_usuario": 5,
  "nombre": "Lucía",
  "apellido": "Martínez",
  "dni": "11223344",
  "fecha_nacimiento": "1995-03-20",
  "genero": "F",
  "telefono": "123123123",
  "direccion": "Calle Nueva 789"
}


Response:

{
  "success": true,
  "message": "Cliente creado correctamente",
  "data": {
    "id_cliente": 5,
    "id_usuario": 5,
    "nombre": "Lucía",
    "apellido": "Martínez",
    "dni": "11223344"
  }
}

Actualizar un cliente
PUT /api/clientes/:id

Descripción: Actualiza los datos de un cliente existente.

Request:

{
  "telefono": "555555555",
  "direccion": "Calle Actualizada 321"
}


Response:

{
  "success": true,
  "message": "Cliente actualizado correctamente",
  "data": {
    "id_cliente": 5,
    "telefono": "555555555",
    "direccion": "Calle Actualizada 321"
  }
}

Eliminar un cliente
DELETE /api/clientes/:id

Descripción: Elimina un cliente por ID.

Request: Ninguno (solo el parámetro id en la URL)

Response:

{
  "success": true,
  "message": "Cliente eliminado correctamente"
}

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
├── seeders/         # Crear los datos que necesitamos para la base de datos
└── server.js        # Punto de entrada
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
