# MVP 0.6 · Validación semiautomática manual

MVP 0.6 añade controles de calidad ejecutables bajo demanda. La finalidad es ayudar a revisar, no publicar automáticamente.

## Qué añade

- Workflow manual en `.github/workflows/manual-validation.yml`.
- Informe local de fuentes con `scripts/report-sources.mjs`.
- Comprobación opcional de enlaces con `scripts/check-links.mjs`.
- Documentación del criterio de revisión humana.

## Qué no hace

- No modifica `main`.
- No crea commits automáticos.
- No publica datos oficiales.
- No hace scraping de contenido.
- No sustituye la revisión humana.

## Uso local

Validar estructura y coherencia mínima:

```powershell
node scripts/validate-data.mjs
```

Generar informe de fuentes:

```powershell
node scripts/report-sources.mjs
```

Comprobar enlaces de forma opcional:

```powershell
node scripts/check-links.mjs
```

Si `check-links` marca avisos, deben interpretarse con prudencia: algunos organismos bloquean peticiones automáticas o no aceptan el método `HEAD`. Si aparece `EACCES`, normalmente significa que el entorno local no permite salida a red para ese script.

## Uso en GitHub

Desde GitHub Actions, ejecutar manualmente:

```text
Validacion manual de datos
```

El resultado debe leerse como informe de apoyo. La decisión de publicar, corregir o esperar revisión corresponde a una persona.

## Siguiente fase

MVP 0.7 puede preparar una revisión periódica asistida que genere issue o PR, pero debe seguir sin publicar automáticamente.
