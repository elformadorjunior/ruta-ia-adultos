import { readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const sourcesPath = path.join(root, "data", "sources.yml");
const catalogPath = path.join(root, "data", "catalogo-formaciones.json");

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

function includesReviewSignal(source) {
  const text = `${source.estado ?? ""} ${source.observaciones ?? ""}`.toLowerCase();
  return /revis|contraste|pendiente|orientativo|no oficial/.test(text);
}

const sourcesRaw = await readFile(sourcesPath, "utf8");
const catalog = JSON.parse(await readFile(catalogPath, "utf8"));
const { sources, documented } = parseSourcesYaml(sourcesRaw);

const catalogUrls = catalog.formaciones
  .map((item) => item.fuente?.url)
  .filter((url) => typeof url === "string" && url.trim() !== "");

const catalogLabels = new Set(
  catalog.formaciones
    .map((item) => item.fuente?.etiqueta)
    .filter((label) => typeof label === "string" && label.trim() !== "")
);

const webSources = sources.filter((source) => /^https?:\/\//.test(source.url ?? ""));
const localSources = sources.filter((source) => /^(docs|data|assets|schemas)\//.test(source.url ?? ""));
const pendingSources = sources.filter(includesReviewSignal);
const sourceLabelsMissingInventory = Array.from(catalogLabels).filter((label) => {
  return !sources.some((source) => {
    const visible = `${source.nombre_visible ?? ""} ${source.observaciones ?? ""}`;
    return visible.toLowerCase().includes(label.toLowerCase().split(" ")[0]);
  });
});

console.log("# Informe de fuentes - Ruta IA para Adultos");
console.log("");
console.log(`Fecha de informe: ${new Date().toISOString().slice(0, 10)}`);
console.log("");
console.log("## Resumen");
console.log("");
console.log(`- Fuentes inventariadas: ${sources.length}`);
console.log(`- Fuentes web: ${webSources.length}`);
console.log(`- Fuentes locales/documentales: ${localSources.length}`);
console.log(`- Fuentes con señal de revisión humana: ${pendingSources.length}`);
console.log(`- URLs concretas en catálogo: ${catalogUrls.length}`);
console.log(`- Referentes transversales documentados fuera de catálogo: ${documented.length}`);
console.log("");
console.log("## Fuentes pendientes o revisables");
console.log("");

pendingSources.forEach((source) => {
  console.log(`- ${source.id}: ${source.estado ?? "sin estado"} (${source.frecuencia_revision_recomendada ?? "sin frecuencia"})`);
});

if (sourceLabelsMissingInventory.length > 0) {
  console.log("");
  console.log("## Avisos para revisión humana");
  console.log("");
  sourceLabelsMissingInventory.forEach((label) => {
    console.log(`- Revisar si la etiqueta de catálogo "${label}" necesita entrada más explícita en data/sources.yml.`);
  });
}

console.log("");
console.log("## Criterio");
console.log("");
console.log("Este informe no valida vigencia oficial. Sirve para preparar una revisión humana antes de publicar cambios.");
