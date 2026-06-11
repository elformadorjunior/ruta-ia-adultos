# Changelog

## 0.8.0 - 2026-06-11

- Definida licencia del código bajo MIT en `LICENSE-CODE.md`.
- Definida licencia de contenidos pedagógicos propios bajo CC BY-NC 4.0 en `LICENSE-CONTENT.md`.
- Sustituido `docs/licencia-pendiente.md` por `docs/licencia.md`.
- Actualizados README y metadata para separar código, contenidos y fuentes externas.

## 0.7.0 - 2026-06-09

- Añadido workflow `periodic-review.yml` para revisión periódica asistida mensual y ejecución manual.
- Añadido `scripts/build-review-report.mjs` para generar un informe consolidado de revisión.
- Configurada la revisión periódica para subir informes como artifact, sin commits ni publicación automática.
- Documentada la diferencia entre revisión manual, revisión periódica asistida y publicación humana.
- Actualizados README, metadata, memoria maestra y documentación de automatización.

## 0.6.0 - 2026-06-09

- Añadido workflow manual `manual-validation.yml` para ejecutar validación de datos bajo demanda.
- Añadido `scripts/report-sources.mjs` para generar un informe local de fuentes pendientes de revisión.
- Añadido `scripts/check-links.mjs` como comprobación opcional de enlaces, sin modificar archivos.
- Actualizada la documentación de automatización para reflejar MVP 0.6.
- Actualizados README y metadata con el flujo de validación semiautomática manual.

## 0.5.0 - 2026-06-08

- Añadida sección `Aula` con hoja imprimible para preparar sesiones.
- Añadido botón de impresión y estilos `@media print` para uso docente en papel.
- Añadidas dos fichas metodológicas nuevas sobre comercio/marketing responsable y verificación de fuentes/sesgos.
- Mejorado el comportamiento del menú móvil al navegar entre secciones.
- Preparada la impresión para abrir detalles de ruta y fichas antes de generar la salida.
- Documentada la revisión de aula, móvil e imprimible en `docs/mvp-05-aula-accesibilidad.md`.
- Actualizados README, metadata y memoria maestra a MVP 0.5.

## 0.4.0 - 2026-06-08

- Añadido `data/sources.yml` para centralizar fuentes, estado de revisión y relación con los datos.
- Añadidos esquemas JSON en `schemas/` para documentar la estructura esperada de los datos.
- Añadido `scripts/validate-data.mjs` para validación local sin dependencias externas.
- Documentado el flujo de actualización humana en `docs/actualizacion-contexto.md`.
- Documentada la evolución prudente hacia automatización revisable en `docs/futura-automatizacion.md`.
- Documentada la decisión pendiente de licencia en `docs/licencia-pendiente.md`.
- Estabilizado el recurso visual principal en `assets/hero-estudiar-ia.png`.
- Actualizados README, metadata y aviso de versión del proyecto.

## 0.3.0 - 2026-06-01

- Ajustada la experiencia de usuario de escritorio con una portada más compacta y visual.
- Incorporada la imagen generada `hero-estudiar-ia.png` como fondo de presentación.
- Añadido recorrido guiado por tarjetas para orientar el uso docente.
- Mejorada la lectura de tabla, formularios, fichas y ruta progresiva.
- Preparados ruta y fichas como bloques desplegables para futura revisión móvil.

## 0.2.0 - 2026-06-01

- Reposicionado el recurso como kit metodológico docente con salida simplificada para alumnado.
- Añadida sección sobre utilidad real de la herramienta para docentes, orientadores y alumnado.
- Añadidas fichas metodológicas en `data/fichas-metodologicas.json`.
- Añadida sección de fichas docentes renderizada en la interfaz.
- Mejorada la experiencia móvil básica en botones, tarjetas y espaciados.
- Actualizada documentación para explicar la actualización humana del contexto.

## 0.1.0 - 2026-05-31

- Creada primera versión navegable del MVP **Ruta IA para Adultos · El Formador Junior**.
- Añadida portada con aviso institucional y privacidad básica.
- Añadido mapa de formaciones y referentes oficiales con datos separados en JSON.
- Añadida ruta progresiva de 5 niveles.
- Añadido diagnóstico inicial local sin envío de datos.
- Añadido módulo mínimo **IA sin humo** con checklist y microevaluación.
- Añadida documentación mínima del proyecto, fuentes, criterios pedagógicos, privacidad y límites.
- Preparada estructura estática compatible con GitHub Pages.
