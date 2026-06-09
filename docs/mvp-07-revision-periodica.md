# MVP 0.7 · Revisión periódica asistida

MVP 0.7 añade una revisión periódica asistida. Su objetivo es preparar información para una persona revisora, no publicar cambios.

## Qué añade

- Workflow `.github/workflows/periodic-review.yml`.
- Ejecución manual con `workflow_dispatch`.
- Ejecución mensual programada.
- Informe consolidado con `scripts/build-review-report.mjs`.
- Artifact con `reports/revision-periodica.md` y, si se ejecuta, `reports/check-links.txt`.

## Qué no hace

- No modifica `main`.
- No crea commits.
- No abre PR automáticamente.
- No publica datos oficiales.
- No valida vigencia normativa por sí solo.

## Uso en GitHub

Ejecutar manualmente:

```text
Actions > Revision periodica asistida > Run workflow
```

Después descargar el artifact:

```text
revision-periodica-ruta-ia
```

## Uso local

Generar el informe:

```powershell
node scripts/build-review-report.mjs
```

Guardar el informe en carpeta:

```powershell
node scripts/build-review-report.mjs --output=reports/revision-periodica.md
```

## Criterio de revisión

El informe sirve para detectar señales: fuentes pendientes, estados de fichas, tipos de piezas del catálogo y posibles avisos de enlaces. Cualquier cambio debe pasar por revisión humana, actualización de datos, validación local, changelog y PR.
