import { readFile } from "node:fs/promises";
import https from "node:https";
import http from "node:http";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const catalogPath = path.join(root, "data", "catalogo-formaciones.json");
const timeoutMs = 10000;

function requestUrl(url, redirects = 0) {
  return new Promise((resolve) => {
    const client = url.startsWith("https:") ? https : http;
    const req = client.request(url, { method: "HEAD", timeout: timeoutMs }, (res) => {
      const location = res.headers.location;
      if ([301, 302, 303, 307, 308].includes(res.statusCode) && location && redirects < 3) {
        const nextUrl = new URL(location, url).toString();
        res.resume();
        requestUrl(nextUrl, redirects + 1).then(resolve);
        return;
      }
      res.resume();
      resolve({ url, status: res.statusCode, ok: res.statusCode >= 200 && res.statusCode < 400 });
    });

    req.on("timeout", () => {
      req.destroy();
      resolve({ url, status: "timeout", ok: false });
    });
    req.on("error", (error) => {
      resolve({ url, status: error.code ?? "error", ok: false });
    });
    req.end();
  });
}

const catalog = JSON.parse(await readFile(catalogPath, "utf8"));
const urls = Array.from(
  new Set(
    catalog.formaciones
      .map((item) => item.fuente?.url)
      .filter((url) => /^https?:\/\//.test(url ?? ""))
  )
);

console.log("Comprobacion de enlaces - Ruta IA para Adultos");
console.log(`URLs web a revisar: ${urls.length}`);
console.log("");

const failures = [];
for (const url of urls) {
  const result = await requestUrl(url);
  const label = result.ok ? "OK" : "AVISO";
  console.log(`${label} ${result.status} ${url}`);
  if (!result.ok) failures.push(result);
}

if (failures.length > 0) {
  console.log("");
  console.log("Enlaces con aviso:");
  failures.forEach((item) => console.log(`- ${item.status} ${item.url}`));
  console.log("");
  console.log("Revisar manualmente antes de decidir si el enlace esta roto.");
  console.log("Algunos servidores bloquean HEAD o automatismos; EACCES suele indicar que el entorno local no tiene permiso de red.");
  process.exit(1);
}

console.log("");
console.log("OK: enlaces web respondieron con estado compatible.");
