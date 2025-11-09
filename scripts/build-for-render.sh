#!/bin/bash

echo "🔨 Construyendo frontend..."

# Ir al directorio raíz del proyecto
cd "$(dirname "$0")/.."

# Construir el frontend
npm run build

echo "📦 Copiando build al backend..."

# Copiar el build al backend
rm -rf gametracker-backend/build
cp -r build gametracker-backend/

echo "✅ Build completado y copiado al backend!"
echo "📁 Los archivos están en: gametracker-backend/build"
