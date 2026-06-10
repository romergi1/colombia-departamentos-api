const test = require("node:test");
const assert = require("node:assert/strict");

const data = require("../src/data/departamentos_colombia_dane.json");

test("El archivo de departamentos debe tener estructura válida", () => {
  assert.equal(data.pais, "Colombia");
  assert.ok(Array.isArray(data.departamentos));
  assert.ok(data.departamentos.length > 0);
});

test("Cada departamento debe tener código DANE y nombre", () => {
  for (const departamento of data.departamentos) {
    assert.ok(departamento.codigo_dane);
    assert.ok(departamento.nombre);
  }
});

test("Debe existir el departamento de Antioquia con código DANE 05", () => {
  const antioquia = data.departamentos.find(
    (d) => String(d.codigo_dane).padStart(2, "0") === "05"
  );

  assert.ok(antioquia);
  assert.ok(antioquia.nombre.toLowerCase().includes("antioquia"));
});