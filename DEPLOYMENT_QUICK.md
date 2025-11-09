# ⚡ Despliegue Rápido - Comandos Esenciales

## 📦 Backend en Render

### Variables de Entorno (configurar en Render Dashboard):
```
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/gametracker?retryWrites=true&w=majority
JWT_SECRET=tu_secreto_super_seguro_aleatorio
FRONTEND_URL=https://savavacru.github.io
RAWG_KEY=ba5c476e6efa42a49d800e623d2253d9
```

### Configuración en Render:
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Root Directory**: `gametracker-backend`

---

## 🌐 Frontend en GitHub Pages

### 1. Instalar dependencia (solo la primera vez):
```bash
npm install --save-dev gh-pages
```

### 2. Crear archivo .env.production:
```bash
# .env.production
REACT_APP_API_URL=https://tu-backend.onrender.com/api
```

### 3. Desplegar:
```bash
npm run deploy
```

### 4. Configurar en GitHub:
Settings → Pages → Source: `gh-pages` branch

---

## 🔄 Actualizar Aplicación

### Backend (automático):
```bash
cd gametracker-backend
git add .
git commit -m "Actualización"
git push
# Render re-despliega automáticamente
```

### Frontend:
```bash
npm run deploy
# Construye y despliega en GitHub Pages
```

---

## 🎯 URLs del Proyecto

- **Frontend**: https://savavacru.github.io/GameTracker
- **Backend**: https://tu-app.onrender.com
- **Repo**: https://github.com/savavacru/GameTracker

---

## ✅ Checklist Pre-Despliegue

### MongoDB Atlas
- [ ] Cluster creado (M0 Free)
- [ ] Usuario de base de datos creado
- [ ] IP 0.0.0.0/0 permitida
- [ ] URI de conexión copiada

### Render (Backend)
- [ ] Web Service creado
- [ ] Variables de entorno configuradas
- [ ] Build exitoso
- [ ] URL del backend guardada

### GitHub Pages (Frontend)
- [ ] gh-pages instalado
- [ ] .env.production creado con URL de backend
- [ ] package.json configurado
- [ ] Desplegado con `npm run deploy`
- [ ] Pages configurado en Settings

### Verificación Final
- [ ] Frontend carga sin errores
- [ ] Registro de usuario funciona
- [ ] Login funciona
- [ ] Agregar juego funciona
- [ ] Catálogo muestra juegos
- [ ] Cookies funcionan correctamente
