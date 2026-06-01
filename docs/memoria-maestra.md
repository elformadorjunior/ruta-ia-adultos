# Memoria maestra

## Alcance

Esta memoria resume las decisiones de arquitectura pedagógica y técnica del MVP 0.1 de **Ruta IA para Adultos · El Formador Junior**.

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

## Arquitectura técnica

La herramienta se implementa como web estática:

- `index.html` para la interfaz;
- `src/styles.css` para diseño responsive;
- `src/app.js` para diagnóstico, filtros, checklist y microevaluación;
- `data/catalogo-formaciones.json` para catálogo;
- `data/mapa-competencias.json` para ejes competenciales;
- `data/itinerarios-adultos.json` para ruta progresiva.
- `data/fichas-metodologicas.json` para fichas docentes actualizables.

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
