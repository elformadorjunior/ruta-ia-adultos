import { readFile, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const outputArg = process.argv.find((arg) => arg.startsWith("--output="));
const outputPath = outputArg ? path.join(root, outputArg.slice("--output=".length)) : null;

const files = {
  metadata: "metadata.yml",
  sources: path.join("data", "sources.yml"),
  catalog: path.join("data", "catalogo-formaciones.json"),
  itineraries: path.join("data", "itinerarios-adultos.json"),
  fichas: path.join("data", "fichas-metodologicas.json")
};

function readScalar(value) {
  return value.trim().replace(/^"|"$/g, "");
}

function parseSourcesYaml(raw) {
  const sources = [];
  const documented = [];
  let section = "";
  let current = null;
  let currentListKey = null;

  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    if (trimmed === "fuentes:") {
      section = "fuentes";
      current = null;
      continue;
    }
    if (trimmed === "referentes_documentados_sin_catalogo:") {
      section = "referentes";
      current = null;
      continue;
    }

    if (trimmed.startsWith("- id:")) {
      current = { id: readScalar(trimmed.slice(5)) };
      currentListKey = null;
      if (section === "fuentes") sources.push(current);
      if (section === "referentes") documented.push(current);
      continue;
    }

    if (!current) continue;

    const keyValue = trimmed.match(/^([a-zA-Z0-9_]+):\s*(.*)$/);
    if (keyValue) {
      const [, key, value] = keyValue;
      if (value === "") {
        current[key] = [];
        currentListKey = key;
      } else {
        current[key] = readScalar(value);
        currentListKey = null;
      }
      continue;
    }

    if (currentListKey && trimmed.startsWith("- ")) {
      current[currentListKey].push(readScalar(trimmed.slice(2)));
    }
  }

  return { sources, documented };
}

function parseMetadataVersion(raw) {
  return raw.match(/^version:\s*"([^"]+)"/m)?.[1] ?? "sin version";
}

function includesReviewSignal(source) {
  const text = `${source.estado ?? ""} ${source.observaciones ?? ""}`.toLowerCase();
  return /revis|contraste|pendiente|orientativo|no oficial/.test(text);
}

function countBy(items, key) {
  return items.reduce((acc, item) => {
    const value = item[key] ?? "sin dato";
    acc[value] = (acc[value] ?? 0) + 1;
    return acc;
  }, {});
}

function renderCountMap(map) {
  return Object.entries(map)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([key, value]) => `- ${key}: ${value}`)
    .join("\n");
}

const [metadataRaw, sourcesRaw, catalogRaw, itinerariesRaw, fichasRaw] = await Promise.all([
  readFile(path.join(root, files.metadata), "utf8"),
  readFile(path.join(root, files.sources), "utf8"),
  readFile(path.join(root, files.catalog), "utf8"),
  readFile(path.join(root, files.itineraries), "utf8"),
  readFile(path.join(root, files.fichas), "utf8")
]);

const catalog = JSON.parse(catalogRaw);
const itineraries = JSON.parse(itinerariesRaw);
const fichas = JSON.parse(fichasRaw);
const { sources, documented } = parseSourcesYaml(sourcesRaw);

const webUrls = catalog.formaciones
  .map((item) => item.fuente?.url)
  .filter((url) => /^https?:\/\//.test(url ?? ""));
const uniqueWebUrls = new Set(webUrls);
const pendingSources = sources.filter(includesReviewSignal);
const fichaStates = countBy(fichas.fichas, "estado");
const catalogTypes = countBy(catalog.formaciones, "tipoPieza");

const report = [
  "# Revision periodica asistida - Ruta IA para Adultos",
  "",
  `Fecha de informe: ${new Date().toISOString()}`,
  `Version metadata: ${parseMetadataVersion(metadataRaw)}`,
  "",
  "## Resumen",
  "",
  `- Piezas de catalogo: ${catalog.formaciones.length}`,
  `- Niveles de itinerario: ${itineraries.niveles.length}`,
  `- Fichas metodologicas: ${fichas.fichas.length}`,
  `- Fuentes inventariadas: ${sources.length}`,
  `- Fuentes con señal de revision humana: ${pendingSources.length}`,
  `- URLs web unicas en catalogo: ${uniqueWebUrls.size}`,
  `- Referentes transversales documentados fuera de catalogo: ${documented.length}`,
  "",
  "## Tipos de piezas en catalogo",
  "",
  renderCountMap(catalogTypes),
  "",
  "## Estado de fichas metodologicas",
  "",
  renderCountMap(fichaStates),
  "",
  "## Fuentes pendientes o revisables",
  "",
  ...pendingSources.map((source) => `- ${source.id}: ${source.estado ?? "sin estado"} (${source.frecuencia_revision_recomendada ?? "sin frecuencia"})`),
  "",
  "## Recomendacion de revision humana",
  "",
  "- Revisar fuentes con periodicidad mensual o trimestral antes de publicar cambios.",
  "- Contrastar cualquier aviso de enlaces de forma manual.",
  "- Actualizar `metadata.yml` y `CHANGELOG.md` solo tras decidir una publicacion.",
  "- Mantener la distincion entre especialidades formativas, certificados, marcos y benchmarks.",
  "",
  "## Criterio",
  "",
  "Este informe ayuda a preparar una revision. No valida vigencia oficial, no publica datos y no sustituye el criterio humano.",
  ""
].join("\n");

if (outputPath) {
  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, report, "utf8");
  console.log(`Informe generado: ${outputPath}`);
} else {
  console.log(report);
}
