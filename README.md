# Ruta IA para Adultos · Kit metodológico docente

Herramienta estática de **El Formador Junior** para que docentes, formadores y orientadores diseñen rutas de aprendizaje en inteligencia artificial para personas adultas.

Conecta actividades prácticas con referentes oficiales y ayuda a distinguir especialidades formativas, estándares competenciales, cualificaciones, certificados, cursos de especialización y benchmarks sin prometer acreditaciones que no correspondan.

Este proyecto es personal y de portfolio técnico-docente. No es un recurso oficial del SCE, SEPE, BOE, ICSE ni de ninguna entidad formativa.

## Estado

MVP 0.7.0: revisión periódica asistida que genera informes revisables sin publicar automáticamente.

La web sigue siendo estática, compatible con GitHub Pages y sin backend, login, analítica, cookies innecesarias ni recogida de datos personales.

## Para quién es

- Docentes, formadores y orientadores que preparan sesiones de IA para adultos.
- Equipos que necesitan justificar itinerarios y actividades con prudencia institucional.
- Alumnado adulto, mediante diagnóstico local, módulo inicial, checklist y microevaluación.

## Estructura

- `index.html`: interfaz principal.
- `src/styles.css`: estilos responsive.
- `src/app.js`: filtros, diagnóstico, checklist y microevaluación.
- `data/catalogo-formaciones.json`: catálogo de formaciones, marcos y benchmarks.
- `data/itinerarios-adultos.json`: ruta progresiva de 5 niveles.
- `data/mapa-competencias.json`: ejes, capas y taxonomía competencial.
- `data/fichas-metodologicas.json`: fichas docentes.
- `data/sources.yml`: inventario de fuentes y estado de revisión.
- `schemas/`: esquemas de estructura para los JSON.
- `scripts/validate-data.mjs`: validación local sin dependencias externas.
- `scripts/report-sources.mjs`: informe local de fuentes pendientes de revisión humana.
- `scripts/build-review-report.mjs`: informe consolidado para revisión periódica asistida.
- `scripts/check-links.mjs`: comprobación opcional de enlaces web.
- `.github/workflows/manual-validation.yml`: acción manual de validación sin publicación automática.
- `.github/workflows/periodic-review.yml`: revisión periódica asistida con artifact de informe.
- `docs/actualizacion-contexto.md`: flujo de actualización humana.
- `docs/futura-automatizacion.md`: fases prudentes para automatización futura.
- `docs/mvp-05-aula-accesibilidad.md`: revisión de aula, móvil, impresión y accesibilidad básica.
- `docs/mvp-06-validacion-manual.md`: validación semiautomática manual e informe de fuentes.

## Cómo ejecutarlo

La aplicación es estática. Para que los JSON carguen correctamente, usa un servidor local:

```powershell
python -m http.server 8765
```

Después abre:

```text
http://127.0.0.1:8765/
```

También puede publicarse directamente en GitHub Pages desde la raíz del repositorio.

## Cómo validar datos

Ejecuta:

```powershell
node scripts/validate-data.mjs
```

El script comprueba que los JSON se pueden parsear, que existen campos mínimos, que no hay códigos repetidos, que las fichas tienen `ultimaRevision`, que no hay URLs vacías y que los referentes usados en fichas, itinerarios y mapa existen en el catálogo o están documentados como marcos transversales.

Los esquemas de `schemas/` dejan preparado el contrato de datos para validación JSON Schema futura.

## Cómo revisar fuentes

Para generar un informe local:

```powershell
node scripts/report-sources.mjs
```

Para una comprobación opcional de enlaces web:

```powershell
node scripts/check-links.mjs
```

La comprobación de enlaces puede fallar aunque una página exista, porque algunos servidores bloquean peticiones automáticas o métodos `HEAD`. Cualquier aviso debe revisarse manualmente.

Si aparece `EACCES`, normalmente significa que el entorno local no permite salida a red para ese script.

El workflow de GitHub Actions es manual (`workflow_dispatch`). No hace commits, no modifica `main` y no publica datos.

## Revisión periódica asistida

MVP 0.7 añade un workflow programado mensual y ejecutable manualmente:

```text
Actions > Revision periodica asistida > Run workflow
```

El workflow valida datos, genera un informe consolidado, ejecuta la comprobación opcional de enlaces y sube los resultados como artifact. No hace commits, no abre PR, no modifica `main` y no publica datos.

## Versión imprimible

La sección `Aula` incluye una hoja breve de preparación de sesión. Puede imprimirse desde el botón de la interfaz o con la opción de impresión del navegador.

La impresión no envía datos fuera del dispositivo y abre los bloques desplegables para que ruta y fichas queden visibles en papel.

## Privacidad

No solicita datos personales sensibles ni envía respuestas a servidores externos. El diagnóstico guarda únicamente un perfil orientativo en `localStorage` del navegador y puede borrarse desde la propia interfaz.

No hay analítica, backend, login ni formularios externos.

## Actualización del contexto

La actualización es humana y revisable. El archivo `data/sources.yml` centraliza fuentes, entidad, fecha de revisión, estado, frecuencia recomendada y relación con los datos.

Antes de publicar cambios de fuentes o referentes:

1. Revisar la fuente original.
2. Editar los JSON necesarios.
3. Ejecutar `node scripts/validate-data.mjs`.
4. Actualizar `metadata.yml` y `CHANGELOG.md`.
5. Revisar la web localmente.
6. Publicar solo tras revisión humana.

La automatización puede ayudar a detectar cambios, preparar informes o abrir propuestas, pero la publicación de datos formativos y referencias oficiales requiere revisión humana.

## Límites

- No acredita competencias.
- No sustituye fichas oficiales, convocatorias, certificados o programaciones.
- No debe presentarse como material oficial.
- No mezcla especialidades formativas con certificados profesionales.
- No actualiza ni publica información oficial de forma automática.

## Licencia

Pendiente de decisión. Recomendación documentada en `docs/licencia-pendiente.md`:

- Código: MIT.
- Contenidos: CC BY 4.0 o CC BY-NC 4.0.

La decisión final debe confirmarla Joel antes de crear licencias definitivas.

## Próximos pasos

- MVP 1.0: recurso estable de portfolio con licencia definida, accesibilidad revisada, fuentes trazables y flujo de actualización documentado.
