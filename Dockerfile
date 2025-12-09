# Stage 1: Build
FROM node:20-alpine AS builder

# Define argumento para seleccionar el .env
# Por defecto usará .env.docker, pero puedes cambiarlo al hacer build
ARG ENV_FILE=.env.docker

# Setea el directorio de trabajo
WORKDIR /app

# Copia los archivos de dependencias
COPY package*.json ./

# Instala dependencias (más limpio que npm install)
RUN npm ci

# Copia el archivo de entorno elegido
COPY ${ENV_FILE} .env

# Copia el resto del código fuente
COPY . .

# Compila el proyecto para producción
RUN npm run build


# Stage 2: Nginx para servir el build
FROM nginx:alpine

# Copia configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia los archivos generados desde el build
COPY --from=builder /app/dist /usr/share/nginx/html

# Exponer puerto 80
EXPOSE 80

# Comando por defecto de Nginx
CMD ["nginx", "-g", "daemon off;"]
