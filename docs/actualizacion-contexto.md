# Actualizacion del contexto

Este documento describe el flujo prudente para revisar y actualizar los datos de **Ruta IA para Adultos**.

La automatizacion puede ayudar a detectar cambios, preparar informes o abrir propuestas, pero la publicacion de datos formativos y referencias oficiales requiere revision humana.

## Principios

- La herramienta es un recurso personal, pedagogico y no oficial de El Formador Junior.
- No acredita competencias ni sustituye fichas oficiales, convocatorias, certificados o programaciones.
- Los datos se actualizan de forma humana y revisable.
- No se publican cambios sensibles o normativos sin contraste.
- No se recogen datos personales ni se anade backend para actualizar el contexto.

## Revisar fuentes

1. Consulta `data/sources.yml` para ver fuentes, estado, fecha de ultima revision y frecuencia recomendada.
2. Abre la fuente original indicada en cada elemento de `data/catalogo-formaciones.json`.
3. Comprueba codigo, denominacion, horas, tipo de pieza, modalidad visible y observaciones pedagogicas.
4. Si la fuente ha cambiado, documenta el cambio antes de modificar el dato.
5. Si no puedes confirmar una fuente, marca el elemento como pendiente en observaciones o en la ficha metodologica relacionada.

## Editar JSON

Edita solo los archivos necesarios:

- `data/catalogo-formaciones.json`: catalogo de piezas formativas, marcos y benchmarks.
- `data/itinerarios-adultos.json`: ruta progresiva de niveles.
- `data/mapa-competencias.json`: capas competenciales y taxonomia.
- `data/fichas-metodologicas.json`: fichas docentes aplicables en aula.

Mantener reglas basicas:

- No mezclar especialidades formativas con certificados profesionales.
- No presentar benchmarks como oferta formativa no reglada.
- No introducir fuentes nuevas sin dejar URL, entidad, estado y fecha en `data/sources.yml`.
- No borrar avisos de no oficialidad.

## Validar datos

Ejecuta:

```powershell
node scripts/validate-data.mjs
```

El script comprueba que los JSON se pueden leer, que existen campos minimos, que no hay codigos repetidos, que las fichas tienen `ultimaRevision` y que los referentes principales existen en el catalogo o estan documentados como marcos transversales.

Los esquemas de `schemas/` sirven como contrato de estructura para una validacion JSON Schema futura o para revisiones manuales.

## Actualizar metadata

Al preparar una version nueva, revisa `metadata.yml`:

- `version`
- `date`
- `context_update.last_review`
- lista de `context_update.data_files`
- `ux.hero_asset` si cambia el recurso visual principal

## Actualizar changelog

Anade una entrada en `CHANGELOG.md` con:

- version;
- fecha;
- cambios de datos;
- cambios de documentacion;
- cambios de validacion;
- limites o decisiones pendientes.

## Marcar pendientes de revision

Usa expresiones claras en `estado`, `observaciones` o `observacionesPedagogicas`, por ejemplo:

- `requiere revision humana`;
- `pendiente de contraste sectorial`;
- `benchmark formal a revisar`;
- `interno, orientativo y no oficial`.

Si una informacion puede cambiar por convocatoria, no la presentes como vigente sin revisar la fuente en la fecha de publicacion.

## Preparar revisiones periodicas

La revision recomendada para MVP 0.4 es manual:

1. Revisar fuentes segun `data/sources.yml`.
2. Editar JSON.
3. Ejecutar `node scripts/validate-data.mjs`.
4. Revisar la web localmente.
5. Actualizar `metadata.yml` y `CHANGELOG.md`.
6. Publicar solo tras revision humana.

La fase siguiente puede incorporar una accion manual de GitHub que ejecute el validador, pero no debe modificar `main` ni publicar informacion oficial sin supervision.
