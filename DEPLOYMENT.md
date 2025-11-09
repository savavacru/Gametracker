# 🚀 Guía de Despliegue - GameTracker

Esta guía te ayudará a desplegar GameTracker en producción:
- **Backend**: Render (Node.js + Express + MongoDB Atlas)
- **Frontend**: GitHub Pages (React)

---

## 📋 Pre-requisitos

1. ✅ Cuenta en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (gratis)
2. ✅ Cuenta en [Render](https://render.com/) (gratis)
3. ✅ Cuenta en [GitHub](https://github.com/) (gratis)
4. ✅ Cuenta en [RAWG](https://rawg.io/apidocs) para obtener API Key (gratis)

---

## 🗄️ PASO 1: Configurar MongoDB Atlas

### 1.1 Crear Base de Datos en la Nube

1. Ve a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Crea una cuenta gratuita o inicia sesión
3. Crea un nuevo cluster (selecciona el plan FREE M0)
4. Una vez creado, haz clic en **"Connect"**
5. Configura el acceso:
   - Crea un usuario de base de datos (guarda usuario y contraseña)
   - Añade la dirección IP: **0.0.0.0/0** (permitir conexiones desde cualquier IP)
6. Selecciona **"Connect your application"**
7. Copia la cadena de conexión (MongoDB URI), se verá así:
   ```
   mongodb+srv://<usuario>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
8. Reemplaza `<usuario>` y `<password>` con tus credenciales
9. Añade el nombre de la base de datos después del `/`, ejemplo:
   ```
   mongodb+srv://usuario:password@cluster0.xxxxx.mongodb.net/gametracker?retryWrites=true&w=majority
   ```

---

## 🖥️ PASO 2: Desplegar Backend en Render

### 2.1 Preparar el Repositorio Backend

1. Asegúrate de que todos los cambios están committed:
   ```bash
   cd gametracker-backend
   git add .
   git commit -m "Preparar backend para producción"
   git push
   ```

### 2.2 Crear Web Service en Render

1. Ve a [Render Dashboard](https://dashboard.render.com/)
2. Clic en **"New +"** → **"Web Service"**
3. Conecta tu repositorio de GitHub (puede ser el mismo repo, solo la carpeta backend)
4. Configura el servicio:
   - **Name**: `gametracker-backend` (o el nombre que prefieras)
   - **Environment**: `Node`
   - **Region**: Selecciona la más cercana a ti
   - **Branch**: `main`
   - **Root Directory**: `gametracker-backend` (importante si está en subcarpeta)
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: `Free`

### 2.3 Configurar Variables de Entorno

En la sección **"Environment Variables"**, añade:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `PORT` | `5000` |
| `MONGODB_URI` | Tu URI de MongoDB Atlas (del Paso 1) |
| `JWT_SECRET` | Una cadena aleatoria larga y segura |
| `FRONTEND_URL` | `https://savavacru.github.io` |
| `RAWG_KEY` | Tu API key de RAWG |

**Ejemplo de JWT_SECRET**: `kJ8nH6mP4wQ2sR9tY1vX3zC5bN7aE0fG`

### 2.4 Desplegar

1. Haz clic en **"Create Web Service"**
2. Render empezará a construir y desplegar tu backend
3. Una vez desplegado, verás la URL de tu backend:
   ```
   https://gametracker-backend-xxxx.onrender.com
   ```
4. **¡Guarda esta URL!** La necesitarás para el frontend

### 2.5 Verificar el Backend

Abre en tu navegador:
```
https://gametracker-backend-xxxx.onrender.com
```

Deberías ver:
```json
{
  "mensaje": "API de GameTracker funcionando correctamente"
}
```

---

## 🌐 PASO 3: Desplegar Frontend en GitHub Pages

### 3.1 Instalar gh-pages

En la carpeta raíz del proyecto frontend:

```bash
cd /home/ivanausecha/Documentos/GameTracker
npm install --save-dev gh-pages
```

### 3.2 Actualizar la URL del Backend

Crea un archivo `.env.production` en la raíz del frontend:

```bash
# .env.production
REACT_APP_API_URL=https://gametracker-backend-xxxx.onrender.com/api
```

**⚠️ Reemplaza** `gametracker-backend-xxxx.onrender.com` con tu URL real de Render.

### 3.3 Verificar package.json

El archivo `package.json` ya debe tener:

```json
{
  "homepage": "https://savavacru.github.io/GameTracker",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

### 3.4 Construir y Desplegar

```bash
npm run deploy
```

Este comando:
1. Construye la aplicación para producción (`npm run build`)
2. Crea una rama `gh-pages` en tu repositorio
3. Sube los archivos compilados a esa rama

### 3.5 Configurar GitHub Pages

1. Ve a tu repositorio en GitHub: `https://github.com/savavacru/GameTracker`
2. Ve a **Settings** → **Pages**
3. En **Source**, selecciona:
   - Branch: `gh-pages`
   - Folder: `/ (root)`
4. Haz clic en **Save**
5. Espera unos minutos y tu sitio estará disponible en:
   ```
   https://savavacru.github.io/GameTracker
   ```

---

## ✅ PASO 4: Verificar el Despliegue

### 4.1 Probar el Frontend

1. Abre: `https://savavacru.github.io/GameTracker`
2. Verifica que:
   - ✅ La página carga correctamente
   - ✅ Puedes registrar un usuario nuevo
   - ✅ Puedes iniciar sesión
   - ✅ Puedes agregar juegos
   - ✅ El catálogo muestra juegos de RAWG
   - ✅ Las estadísticas se muestran correctamente

### 4.2 Verificar CORS

Si hay errores de CORS, verifica en el backend (`index.js`) que la URL de GitHub Pages está en `allowedOrigins`:

```javascript
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  process.env.FRONTEND_URL,
  'https://savavacru.github.io'
].filter(Boolean);
```

---

## 🔄 Actualizar el Proyecto

### Actualizar Backend

```bash
cd gametracker-backend
# Hacer cambios...
git add .
git commit -m "Descripción de los cambios"
git push
```

Render detectará los cambios y re-desplegará automáticamente.

### Actualizar Frontend

```bash
cd /home/ivanausecha/Documentos/GameTracker
# Hacer cambios...
npm run deploy
```

Esto construirá y desplegará la nueva versión en GitHub Pages.

---

## 🐛 Solución de Problemas

### Backend no se conecta a MongoDB

- Verifica que la URI de MongoDB es correcta
- Asegúrate de que la IP `0.0.0.0/0` está permitida en Atlas
- Verifica que usuario y contraseña son correctos

### Frontend no puede conectarse al Backend

- Verifica que `REACT_APP_API_URL` en `.env.production` es correcta
- Revisa las variables de entorno en Render
- Verifica que CORS está configurado correctamente

### GitHub Pages muestra página en blanco

- Verifica que el `homepage` en `package.json` es correcto
- Asegúrate de que ejecutaste `npm run deploy`
- Revisa la consola del navegador para errores

### Cookies no funcionan en producción

- Asegúrate de que en `usuarioController.js` las cookies tienen:
  ```javascript
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // true en producción
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 2 * 60 * 60 * 1000,
  });
  ```
- Verifica que `NODE_ENV=production` en Render

---

## 📝 Notas Importantes

1. **Render Free Tier**: El servicio gratuito "duerme" después de 15 minutos de inactividad. La primera carga puede tardar 30-60 segundos.

2. **MongoDB Atlas Free Tier**: Tiene límite de 512 MB de almacenamiento.

3. **GitHub Pages**: Los cambios pueden tardar unos minutos en reflejarse.

4. **HTTPS**: GitHub Pages y Render usan HTTPS automáticamente. Las cookies con `secure: true` solo funcionan en HTTPS.

5. **Variables de Entorno**: Nunca subas archivos `.env` a GitHub. Usa `.env.example` como plantilla.

---

## 🎉 ¡Listo!

Tu aplicación GameTracker ahora está desplegada y accesible públicamente:

- 🌐 **Frontend**: https://savavacru.github.io/GameTracker
- 🖥️ **Backend**: https://gametracker-backend-xxxx.onrender.com

¡Comparte el enlace con tus amigos! 🚀
