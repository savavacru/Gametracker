# 🎮 GameTracker

**GameTracker** es una aplicación web completa para rastrear y gestionar tu biblioteca personal de videojuegos. Organiza tus juegos, registra tus horas de juego, marca juegos como completados, y descubre nuevos títulos a través de la integración con RAWG API.

![React](https://img.shields.io/badge/React-19.2.0-blue)
![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![MongoDB](https://img.shields.io/badge/MongoDB-8.19.2-brightgreen)
![Express](https://img.shields.io/badge/Express-5.1.0-lightgrey)

## ✨ Características

### 🔐 Autenticación de Usuario
- Registro e inicio de sesión seguro con JWT
- Contraseñas encriptadas con bcrypt
- Cookies httpOnly para mayor seguridad
- Sesiones persistentes

### 📚 Gestión de Biblioteca Personal
- Agrega juegos manualmente o desde el catálogo
- Edita información de tus juegos
- Registra horas jugadas
- Marca juegos como completados o pendientes
- Elimina juegos de tu biblioteca
- Vista de lista con todas tus estadísticas

### 🎯 Dashboard Personalizado
- Resumen rápido de tu biblioteca
- Total de juegos
- Juegos completados vs pendientes
- Total de horas jugadas
- Buscador integrado de juegos de RAWG API
- Formulario para agregar/editar juegos

### 🗂️ Catálogo de Juegos
- Navegación por carruseles temáticos:
  - Juegos Populares
  - Acción
  - Aventura
  - Estrategia
- Buscador potente con la API de RAWG
- Vista detallada de cada juego con:
  - Imagen de portada
  - Rating
  - Fecha de lanzamiento
  - Géneros
  - Plataformas disponibles
- Guardado directo a biblioteca desde el catálogo

### 📊 Estadísticas Detalladas
- Cards con métricas clave
- Progreso de completación con gráfico circular SVG
- Ranking de tus 3 juegos más jugados (con medallas)
- Género favorito destacado
- Grid de todos tus géneros
- Diseño moderno y visualmente atractivo

## 🛠️ Tecnologías

### Frontend
- **React 19.2.0** - Biblioteca UI
- **React Router** (custom) - Navegación
- **CSS3** - Estilos con variables CSS y tema oscuro
- **Fetch API** - Comunicación con backend

### Backend
- **Node.js 18+** - Runtime de JavaScript
- **Express 5.1.0** - Framework web
- **MongoDB 8.19.2** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB
- **JWT** - Autenticación con tokens
- **bcrypt** - Encriptación de contraseñas
- **CORS** - Configurado para frontend

### APIs Externas
- **RAWG API** - Base de datos de videojuegos

## 📦 Instalación y Configuración

### Requisitos Previos
- Node.js 18 o superior
- MongoDB (local o MongoDB Atlas)
- Cuenta en RAWG API (gratis)

### 1. Clonar el Repositorio

```bash
git clone https://github.com/savavacru/GameTracker.git
cd GameTracker
```

### 2. Configurar Backend

```bash
cd gametracker-backend
npm install
```

Crear archivo `.env`:

```env
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
JWT_SECRET=tu_secreto_super_seguro_cambialo
MONGODB_URI=mongodb://localhost:27017/gametracker
RAWG_KEY=tu_api_key_de_rawg
```

Iniciar el servidor:

```bash
npm start
```

El backend estará en `http://localhost:5000`

### 3. Configurar Frontend

```bash
cd ..  # Volver a la raíz
npm install
```

Crear archivo `.env`:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

Iniciar la aplicación:

```bash
npm start
```

El frontend estará en `http://localhost:3000`

## 🚀 Despliegue en Producción

Ver la [Guía de Despliegue Completa](DEPLOYMENT.md) para instrucciones detalladas sobre cómo desplegar en:
- **Backend**: Render (gratis)
- **Frontend**: GitHub Pages (gratis)

O consulta el [Resumen Rápido de Despliegue](DEPLOYMENT_QUICK.md) para comandos esenciales.

## 📁 Estructura del Proyecto

```
GameTracker/
├── gametracker-backend/       # API Backend
│   ├── src/
│   │   ├── config/           # Configuración DB
│   │   ├── controllers/      # Lógica de negocio
│   │   ├── middleware/       # Auth middleware
│   │   ├── models/          # Modelos Mongoose
│   │   ├── routes/          # Rutas API
│   │   └── index.js         # Punto de entrada
│   ├── .env                 # Variables de entorno (no incluido)
│   ├── .env.example         # Plantilla de variables
│   └── package.json
│
├── src/                     # Frontend React
│   ├── components/         # Componentes React
│   │   ├── Navbar.jsx
│   │   ├── Home.jsx
│   │   ├── LoginForm.jsx
│   │   ├── RegisterForm.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Catalogo.jsx
│   │   ├── CarruselJuegos.jsx
│   │   ├── BuscadorJuegos.jsx
│   │   ├── DetalleJuegoOverlay.jsx
│   │   ├── FormularioJuego.jsx
│   │   ├── ListaJuegos.jsx
│   │   ├── TarjetaJuegos.jsx
│   │   └── Estadisticas.jsx
│   ├── services/          # Servicios API
│   │   ├── authService.js
│   │   └── juegoService.js
│   ├── App.js            # Componente principal
│   └── index.js          # Punto de entrada
│
├── public/              # Archivos públicos
├── .env                # Variables de entorno (no incluido)
├── .env.example        # Plantilla de variables
├── package.json
├── DEPLOYMENT.md       # Guía completa de despliegue
└── README.md          # Este archivo
```

## 🎨 Capturas de Pantalla

*(Aquí puedes agregar capturas de pantalla de tu aplicación)*

- Home Page
- Dashboard
- Catálogo con Carruseles
- Overlay de Detalles de Juego
- Estadísticas

## 🔐 API Endpoints

### Autenticación
- `POST /api/usuarios/register` - Registrar usuario
- `POST /api/usuarios/login` - Iniciar sesión
- `POST /api/usuarios/logout` - Cerrar sesión
- `GET /api/usuarios/perfil` - Obtener perfil (autenticado)

### Juegos
- `GET /api/juegos` - Obtener juegos del usuario
- `POST /api/juegos` - Agregar juego (autenticado)
- `PUT /api/juegos/:id` - Editar juego (autenticado)
- `DELETE /api/juegos/:id` - Eliminar juego (autenticado)

## 🤝 Contribuir

Este es un proyecto personal, pero las sugerencias y mejoras son bienvenidas.

## 📝 Licencia

ISC

## 👨‍💻 Autor

**Iván Ausecha**
- GitHub: [@savavacru](https://github.com/savavacru)

---

## 📚 Scripts Disponibles

### Frontend

#### `npm start`
Ejecuta la app en modo desarrollo.
Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

#### `npm run build`
Construye la app para producción en la carpeta `build`.

#### `npm run deploy`
Despliega la aplicación en GitHub Pages.

### Backend

#### `npm start`
Inicia el servidor en modo producción.

#### `npm run dev`
Inicia el servidor con nodemon (reinicio automático).

---

¡Disfruta organizando tu biblioteca de videojuegos! 🎮✨
