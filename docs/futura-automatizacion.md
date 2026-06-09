# Futura automatizacion

MVP 0.7 activa una revision periodica asistida. No publica automaticamente ni modifica `main`.

## Evolucion por fases

1. **Validacion local.** Mantener `scripts/validate-data.mjs` como comprobacion ligera sin dependencias externas.
2. **Validacion manual antes de publicar.** Revisar datos, fuentes, README, metadata y changelog antes de cualquier despliegue.
3. **GitHub Action manual.** En MVP 0.6 existe un workflow con `workflow_dispatch` para ejecutar el validador y generar un informe de fuentes.
4. **Action programada sin publicacion directa.** En MVP 0.7 existe una tarea mensual que genera un informe como artifact.
5. **Revision humana.** Joel o la persona responsable revisa cambios, fuentes y lenguaje institucional.
6. **Publicacion.** Solo se publica despues de aprobar la revision.

## Reglas para cualquier workflow futuro

- No debe hacer commits automaticos en `main`.
- No debe publicar datos oficiales sin revision humana.
- No debe hacer scraping agresivo ni llamadas a APIs externas sin justificarlo.
- No debe anadir secretos, login, analitica ni recogida de datos personales.
- Si abre un PR, debe marcar claramente que es una propuesta pendiente de revision.

## Workflows actuales

El workflow manual se limita a:

```yaml
name: Validar datos

on:
  workflow_dispatch:

jobs:
  validate-data:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "22"
      - run: node scripts/validate-data.mjs
      - run: node scripts/report-sources.mjs
```

Este workflow no hace commits, no modifica `main`, no publica datos oficiales y no sustituye la revision humana.

El workflow periodico actual:

```yaml
name: Revision periodica asistida

on:
  workflow_dispatch:
  schedule:
    - cron: "0 8 1 * *"
```

Genera `reports/revision-periodica.md` y `reports/check-links.txt`, los sube como artifact y no modifica el repositorio.
