
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const departamentosRouter = require("./routes/departamentos");

// Cargamos el JSON en memoria (está en src/data)
const data = require("./data/departamentos_colombia_dane.json");

const app = express();

const PORT = Number(process.env.PORT || 3000);
const BASE_PATH = (process.env.BASE_PATH || "/api/v1").replace(/\/$/, "");

app.use(cors());
app.use(express.json());


function normalizarTexto(valor) {
  return String(valor || "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
}

// Endpoint HEALT
app.get("/health", (req, res) => {
  res.status(200).json({
    estado: "ok",
    servicio: "colombia-departamentos-api",
    fechaHora: new Date().toISOString(),
  });
});

// Rutas de negocio (JSON completo)
app.use(`${BASE_PATH}/departamentos`, departamentosRouter);

/**
 * BÚSQUEDA POR QUERY PARAMS
 * GET  /api/v1/departamentos/buscar?codigo=05
 * GET  /api/v1/departamentos/buscar?nombre=antioquia
 */
app.get(`${BASE_PATH}/departamentos/buscar`, (req, res) => {
  const { codigo, nombre } = req.query;

  if (!codigo && !nombre) {
    return res.status(400).json({
      error: "Solicitud inválida",
      detalle: "Debes enviar ?codigo=XX o ?nombre=XXXX",
      ejemplo: [
        `${BASE_PATH}/departamentos/buscar?codigo=05`,
        `${BASE_PATH}/departamentos/buscar?nombre=antioquia`,
      ],
    });
  }

  let encontrado = null;

  // 1) Búsqueda por código (exacta)
  if (codigo) {
    const codigoNorm = String(codigo).trim().padStart(2, "0");
    encontrado = data.departamentos.find(
      (d) => String(d.codigo_dane) === codigoNorm
    );
  }

  // 2) Si no encontró por código y viene nombre: búsqueda exacta por nombre normalizado
  if (!encontrado && nombre) {
    const nombreNorm = normalizarTexto(nombre);
    encontrado = data.departamentos.find(
      (d) => normalizarTexto(d.nombre) === nombreNorm
    );
  }

  if (!encontrado) {
    return res.status(404).json({
      error: "No encontrado",
      detalle: "No existe un departamento que coincida con el criterio enviado.",
    });
  }

  return res.status(200).json(encontrado);
});


app.get(`${BASE_PATH}/departamentos/:codigo`, (req, res) => {
  const codigoNorm = String(req.params.codigo).trim().padStart(2, "0");

  const encontrado = data.departamentos.find(
    (d) => String(d.codigo_dane) === codigoNorm
  );

  if (!encontrado) {
    return res.status(404).json({
      error: "No encontrado",
      detalle: `No existe un departamento con código ${codigoNorm}.`,
    });
  }

  return res.status(200).json(encontrado);
});

// tratamiento error 404
app.use((req, res) => {
  res.status(404).json({
    error: "No encontrado",
    detalle: "La ruta solicitada no existe.",
  });
});

// Manejo de errores 
app.use((err, req, res, next) => {
  console.error("Error no controlado:", err);
  res.status(500).json({
    error: "Error interno",
    detalle: "Ocurrió un error inesperado en el servidor.",
  });
});

app.listen(PORT, () => {
  console.log(`****->API escuchando en http://localhost:${PORT}`);
  console.log(`****->Endpoints:`);
  console.log(`   - GET  /health`);
  console.log(`   - GET  ${BASE_PATH}/departamentos`);
  console.log(`   - GET  ${BASE_PATH}/departamentos/buscar?codigo=05`);
  console.log(`   - GET  ${BASE_PATH}/departamentos/buscar?nombre=antioquia`);
  console.log(`   - GET  ${BASE_PATH}/departamentos/05`);
});