# Memoria maestra

## Alcance

Esta memoria resume las decisiones de arquitectura pedagógica y técnica de **Ruta IA para Adultos · El Formador Junior**.

El punto de partida es el documento maestro adjunto: `Documento maestro de formación no reglada en inteligencia artificial para el Servicio Canario de Emp.pdf`.

## Decisión principal

El MVP separa tres planos que no deben mezclarse:

- especialidades formativas no formales y cursos visibles en programación pública;
- base competencial oficial: cualificaciones, estándares ECP y marco de grados;
- cursos de especialización formal que funcionan como benchmark avanzado.

Esta separación evita presentar una especialidad formativa como si fuese un certificado profesional o una titulación formal.

## Reposicionamiento del MVP 0.2

La herramienta se orienta principalmente a docentes, formadores y orientadores. El alumnado adulto sigue siendo destinatario de actividades y módulos simplificados, pero no es el lector principal de la capa normativa.

El valor diferencial del recurso no es ofrecer otro curso de IA, sino ayudar a convertir referentes oficiales y necesidades de empleabilidad en decisiones metodológicas: nivel, objetivo, actividad, evidencia, límites y revisión humana.

## Consolidación del MVP 0.4

El MVP 0.4 incorpora una base de trazabilidad y validación sin cambiar la arquitectura estática del recurso.

Las fuentes pasan a documentarse en `data/sources.yml`, con entidad, tipo, URL, fecha de revisión, frecuencia recomendada, estado y archivos donde se usan. Esta estructura no acredita vigencia; sirve para organizar la revisión humana.

Los esquemas de `schemas/` y el script `scripts/validate-data.mjs` preparan una validación mínima de estructura, referentes, fechas y URLs sin introducir dependencias externas ni automatización de publicación.

La regla pedagógica se mantiene: la automatización puede ayudar a detectar cambios, preparar informes o abrir propuestas, pero la publicación de datos formativos y referencias oficiales requiere revisión humana.

## Mejora de aula del MVP 0.5

El MVP 0.5 se centra en calidad pedagógica aplicada. Añade una sección de preparación de aula con hoja imprimible, mejora el comportamiento móvil del menú y amplía las fichas metodológicas con casos de comercio/marketing responsable y verificación de fuentes.

La impresión se resuelve con el navegador y estilos CSS, sin exportadores externos ni recogida de datos. Antes de imprimir se abren los bloques desplegables para que la ruta y las fichas sean visibles en papel.

## Validación manual del MVP 0.6

El MVP 0.6 añade validación semiautomática manual. El workflow de GitHub Actions solo se ejecuta bajo demanda, con permisos de lectura, y no publica, no crea commits ni modifica `main`.

El informe de fuentes y la comprobación opcional de enlaces son apoyos para revisión humana. Los avisos no deben interpretarse como cambios automáticos ni como prueba definitiva de vigencia oficial.

## Revisión periódica asistida del MVP 0.7

El MVP 0.7 añade una acción programada mensual y ejecutable manualmente. Su salida es un artifact con informe de revisión, no un cambio en el repositorio.

La revisión periódica asistida puede señalar fuentes pendientes, estructura de catálogo, estado de fichas y avisos de enlaces, pero no abre publicación automática ni reemplaza la decisión humana.

## Arquitectura técnica

La herramienta se implementa como web estática:

- `index.html` para la interfaz;
- `src/styles.css` para diseño responsive;
- `src/app.js` para diagnóstico, filtros, checklist, microevaluación e impresión;
- `data/catalogo-formaciones.json` para catálogo;
- `data/mapa-competencias.json` para ejes competenciales;
- `data/itinerarios-adultos.json` para ruta progresiva;
- `data/fichas-metodologicas.json` para fichas docentes actualizables;
- `data/sources.yml` para trazabilidad de fuentes y revisión humana;
- `schemas/` y `scripts/validate-data.mjs` para validación local de estructura y coherencia mínima;
- `.github/workflows/manual-validation.yml`, `scripts/report-sources.mjs` y `scripts/check-links.mjs` para validación semiautomática manual;
- `.github/workflows/periodic-review.yml` y `scripts/build-review-report.mjs` para revisión periódica asistida con informes como artifact;
- sección `Aula` y reglas `@media print` para uso imprimible en clase.

No hay backend, base de datos, login, analítica ni envío de respuestas.

## Arquitectura pedagógica

La ruta se organiza de menor a mayor complejidad:

1. Confianza digital básica.
2. Primer contacto con IA.
3. IA generativa para productividad y estudio.
4. IA aplicada a empleo, comercio, marketing u orientación.
5. Datos, modelos, machine learning y especialización técnica.

El primer módulo formativo se centra en seguridad, límites, verificación y criterio humano.

## Límites

El MVP no acredita competencias, no sustituye fichas oficiales y no valida convocatorias vigentes. Las fuentes deben revisarse antes de usar el recurso en una programación formativa.
