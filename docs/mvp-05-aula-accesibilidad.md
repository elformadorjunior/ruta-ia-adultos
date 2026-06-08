# MVP 0.5 · Aula, móvil e imprimible

MVP 0.5 mejora el uso docente sin cambiar la naturaleza estática del proyecto.

## Cambios de aula

- Se añade una sección `Aula` con una hoja breve para preparar sesiones.
- Se incorporan tres momentos didácticos: antes, durante y después.
- La hoja imprimible permite anotar grupo, nivel, objetivo, actividad, evidencia, límites y cierre.
- Se añaden dos fichas metodológicas nuevas usando referentes ya presentes en el catálogo.

## Impresión

La impresión usa el navegador:

- no requiere backend;
- no usa servicios externos;
- no envía datos;
- abre los bloques desplegables antes de imprimir;
- oculta navegación, filtros y elementos no necesarios en papel.

## Revisión móvil básica

Cambios aplicados:

- el menú móvil se cierra al elegir una sección;
- la sección de aula usa botones y bloques apilables;
- la hoja imprimible pasa a una sola columna en pantallas pequeñas;
- los controles mantienen altura táctil suficiente.

Pendiente para revisión posterior:

- capturas reales en móvil;
- prueba manual del menú en varios anchos;
- revisión visual de tablas en pantallas pequeñas;
- posible vista alternativa de catálogo para móvil.

## Accesibilidad básica

Se mantiene:

- enlace de salto al contenido;
- navegación con `aria-label`;
- botón de menú con `aria-expanded`;
- resultados con `aria-live`;
- foco visible en navegación y desplegables;
- campos agrupados con `fieldset` y `legend`.

Pendiente:

- auditoría con herramienta externa;
- contraste revisado con capturas reales;
- prueba completa con teclado;
- revisión de lectura de tabla por lector de pantalla.

## Criterio

La prioridad de MVP 0.5 no es añadir complejidad, sino hacer el recurso más usable en aula y más fácil de revisar por docentes.
