/**
 * Rutas: Departamentos de Colombia
 */
const express = require("express");
const router = express.Router();

// Cargamos el JSON (se incluye dentro del repo)
const data = require("../data/departamentos_colombia_dane.json");

/**
 * GET /
 * Retorna exactamente el JSON con el listado de departamentos y códigos DANE.
 */
router.get("/", (req, res) => {
  res.status(200).json(data);
});

module.exports = router;
