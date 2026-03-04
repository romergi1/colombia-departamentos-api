# Imagen base con Node.js 24
FROM node:24-alpine

# Carpeta de trabajo dentro del contenedor
WORKDIR /app

# Copiamos manifests primero (mejor cache de capas)
COPY package*.json ./

# Instalación de dependencias (producción)
RUN npm ci --omit=dev

# Copiamos el resto del código
COPY . .

# Puerto expuesto (debe coincidir con tu PORT)
EXPOSE 3000

# Arranque
CMD ["npm", "run", "start"]