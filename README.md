# Microservicio API — Departamentos de Colombia (código DANE)

Este proyecto expone un microservicio (API REST) en **Node.js + Express** que responde con el JSON de departamentos de Colombia y su **código DANE (DIVIPOLA)**.

## Endpoints

- **GET** `/health`  
  Respuesta de salud del servicio.

- **GET** `/api/v1/departamentos`  
  Responde con el JSON:

  - `pais`
  - `fuente`
  - `departamentos[]` con `codigo_dane` y `nombre`

> Nota: El prefijo `/api/v1` se puede cambiar con la variable de entorno `BASE_PATH`.

---

## Requisitos

- Conexión a internet para instalar dependencias (solo la primera vez).
- Node.js (recomendado **LTS**).

---

## Paso a paso: desde instalar Node.js hasta ejecutar la API

### 1) Instalar Node.js

#### Opción A — Instalador oficial (Windows / macOS)
1. Ir a la página oficial de Node.js (descargar versión **LTS**).
2. Instalar con el asistente (dejar opciones por defecto).
3. Abrir una terminal (PowerShell / CMD / Terminal).

#### Opción B — Linux con Node Version Manager (NVM) (recomendado)
> Si ya usas NVM, instala una versión LTS y listo.
1. Instala NVM siguiendo las instrucciones oficiales de tu distribución.
2. Luego:
   ```bash
   nvm install --lts
   nvm use --lts
   ```

### 2) Verificar instalación
Ejecuta:
```bash
node -v
npm -v
```
Debes ver versiones (por ejemplo `v20.x` y `10.x` o similares).

---

## 3) Descargar y descomprimir el proyecto

1. Descarga el `.zip` del proyecto.
2. Descomprímelo en una carpeta, por ejemplo:
   - Windows: `C:\proyectos\colombia-departamentos-api`
   - Linux/Mac: `~/proyectos/colombia-departamentos-api`

---

## 4) Instalar dependencias

En la terminal, entra a la carpeta del proyecto:

```bash
cd colombia-departamentos-api
npm install
```

---

## 5) Configurar variables de entorno (opcional)

El proyecto trae un archivo de ejemplo `.env.example`.  
Si quieres cambiar el puerto o el prefijo:

1. Copia el archivo:
   - Linux/Mac:
     ```bash
     cp .env.example .env
     ```
   - Windows PowerShell:
     ```powershell
     Copy-Item .env.example .env
     ```

2. Edita `.env` (por ejemplo):
   ```env
   PORT=3000
   BASE_PATH=/api/v1
   ```

> Si no creas `.env`, el servicio corre por defecto en `PORT=3000` y `BASE_PATH=/api/v1`.

---

## 6) Ejecutar la API

### Modo normal
```bash
npm run start
```

### Modo desarrollo (reinicio automático)
```bash
npm run dev
```

La consola mostrará algo como:
- `✅ API escuchando en http://localhost:3000`
- `GET /api/v1/departamentos`

---

## 7) Probar el endpoint

En el navegador o con `curl`:

### Health
```bash
curl http://localhost:3000/health
```

### Departamentos
```bash
curl http://localhost:3000/api/v1/departamentos
```

---

## Estructura del proyecto

```
colombia-departamentos-api/
  src/
    index.js
    routes/
      departamentos.js
    data/
      departamentos_colombia_dane.json
  package.json
  .env.example
  .gitignore
  README.md
```

---

## Licencia
MIT
