# Futura automatizacion

MVP 0.6 activa una validacion manual bajo demanda. No activa automatizacion periodica ni publicacion automatica.

## Evolucion por fases

1. **Validacion local.** Mantener `scripts/validate-data.mjs` como comprobacion ligera sin dependencias externas.
2. **Validacion manual antes de publicar.** Revisar datos, fuentes, README, metadata y changelog antes de cualquier despliegue.
3. **GitHub Action manual.** En MVP 0.6 existe un workflow con `workflow_dispatch` para ejecutar el validador y generar un informe de fuentes.
4. **Action programada sin publicacion directa.** En una fase posterior, una tarea mensual o trimestral podria generar un informe, issue o PR.
5. **Revision humana.** Joel o la persona responsable revisa cambios, fuentes y lenguaje institucional.
6. **Publicacion.** Solo se publica despues de aprobar la revision.

## Reglas para cualquier workflow futuro

- No debe hacer commits automaticos en `main`.
- No debe publicar datos oficiales sin revision humana.
- No debe hacer scraping agresivo ni llamadas a APIs externas sin justificarlo.
- No debe anadir secretos, login, analitica ni recogida de datos personales.
- Si abre un PR, debe marcar claramente que es una propuesta pendiente de revision.

## Borrador orientativo

El workflow manual actual se limita a:

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
