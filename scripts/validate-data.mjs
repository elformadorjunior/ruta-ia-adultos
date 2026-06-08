import { readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const dataDir = path.join(root, "data");

const files = {
  catalogo: "catalogo-formaciones.json",
  itinerarios: "itinerarios-adultos.json",
  competencias: "mapa-competencias.json",
  fichas: "fichas-metodologicas.json"
};

const documentedExternalReferences = new Set([
  "requisitos de teleformacion",
  "requisitos de teleformación",
  "alfabetizacion digital transversal",
  "alfabetización digital transversal"
]);

const fatal = [];
const warnings = [];

async function readJson(name) {
  const filePath = path.join(dataDir, files[name]);
  try {
    const raw = await readFile(filePath, "utf8");
    return JSON.parse(raw);
  } catch (error) {
    fatal.push(`${files[name]} no se puede leer o parsear: ${error.message}`);
    return null;
  }
}

function requireText(value, label) {
  if (typeof value !== "string" || value.trim() === "") {
    fatal.push(`Campo obligatorio ausente o vacio: ${label}`);
  }
}

function checkUrl(value, label) {
  requireText(value, label);
  if (typeof value !== "string" || value.trim() === "") return;
  const isWeb = /^https?:\/\//.test(value);
  const isLocalDoc = /^(docs|data|assets|schemas)\//.test(value);
  if (!isWeb && !isLocalDoc) {
    warnings.push(`${label} no parece URL web ni ruta local documentada: ${value}`);
  }
}

function checkArray(value, label) {
  if (!Array.isArray(value)) {
    fatal.push(`${label} debe ser una lista.`);
    return [];
  }
  return value;
}

function checkUnique(values, label) {
  const seen = new Set();
  values.forEach((value) => {
    if (seen.has(value)) fatal.push(`${label} repetido: ${value}`);
    seen.add(value);
  });
}

function checkReferences(references, catalogCodes, context) {
  references.forEach((reference) => {
    if (!catalogCodes.has(reference) && !documentedExternalReferences.has(reference)) {
      const item = String(reference).trim();
      const maybeFramework = /^(RD |Benchmark|Grado C|CE IA Big Data)/.test(item);
      if (maybeFramework) {
        warnings.push(`${context}: referente marco/benchmark fuera del catalogo explicito: ${reference}`);
      } else {
        fatal.push(`${context}: referente no encontrado en catalogo ni documentado: ${reference}`);
      }
    }
  });
}

const catalogo = await readJson("catalogo");
const itinerarios = await readJson("itinerarios");
const competencias = await readJson("competencias");
const fichas = await readJson("fichas");

if (catalogo) {
  const formaciones = checkArray(catalogo.formaciones, "catalogo.formaciones");
  checkUnique(formaciones.map((item) => item.codigo), "codigo de catalogo");

  formaciones.forEach((item, index) => {
    const label = `catalogo.formaciones[${index}]`;
    requireText(item.codigo, `${label}.codigo`);
    requireText(item.denominacion, `${label}.denominacion`);
    requireText(item.tipoPieza, `${label}.tipoPieza`);
    requireText(item.nivelEstimado, `${label}.nivelEstimado`);
    requireText(item.familiaArea, `${label}.familiaArea`);
    if (!item.fuente || typeof item.fuente !== "object") {
      fatal.push(`${label}.fuente debe existir.`);
      return;
    }
    requireText(item.fuente.etiqueta, `${label}.fuente.etiqueta`);
    checkUrl(item.fuente.url, `${label}.fuente.url`);
  });
}

const catalogCodes = new Set(catalogo?.formaciones?.map((item) => item.codigo) ?? []);

if (itinerarios) {
  checkArray(itinerarios.niveles, "itinerarios.niveles").forEach((level, index) => {
    const label = `itinerarios.niveles[${index}]`;
    requireText(level.titulo, `${label}.titulo`);
    requireText(level.objetivo, `${label}.objetivo`);
    checkReferences(checkArray(level.referentes, `${label}.referentes`), catalogCodes, label);
  });
}

if (competencias) {
  checkArray(competencias.capas, "competencias.capas").forEach((layer, index) => {
    const label = `competencias.capas[${index}]`;
    requireText(layer.id, `${label}.id`);
    requireText(layer.nombre, `${label}.nombre`);
    checkReferences(checkArray(layer.referentes, `${label}.referentes`), catalogCodes, label);
  });
}

if (fichas) {
  checkArray(fichas.fichas, "fichas.fichas").forEach((ficha, index) => {
    const label = `fichas.fichas[${index}]`;
    requireText(ficha.id, `${label}.id`);
    requireText(ficha.titulo, `${label}.titulo`);
    requireText(ficha.estado, `${label}.estado`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(ficha.ultimaRevision ?? "")) {
      fatal.push(`${label}.ultimaRevision debe existir con formato YYYY-MM-DD.`);
    }
    checkReferences(checkArray(ficha.referentes, `${label}.referentes`), catalogCodes, label);
  });
}

console.log("Validacion de datos - Ruta IA para Adultos");
console.log(`Archivos JSON revisados: ${Object.values(files).join(", ")}`);

if (warnings.length > 0) {
  console.log("\nAvisos:");
  warnings.forEach((warning) => console.log(`- ${warning}`));
}

if (fatal.length > 0) {
  console.error("\nFallos graves:");
  fatal.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log("\nOK: datos parseables y coherencia minima superada.");
