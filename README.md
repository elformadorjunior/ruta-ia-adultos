# Ruta IA para Adultos · Kit metodológico docente

MVP de una herramienta metodológica para que docentes, formadores y orientadores diseñen rutas de aprendizaje en inteligencia artificial para personas adultas.

La herramienta conecta actividades prácticas con referentes oficiales y ayuda a distinguir especialidades formativas, estándares competenciales, cualificaciones, certificados y cursos de especialización sin prometer acreditaciones que no correspondan.

Este proyecto pertenece a la línea personal y de portfolio técnico-docente de **El Formador Junior**. No es un recurso oficial del Servicio Canario de Empleo, SEPE, BOE, ICSE ni de ninguna entidad pública o privada.

## Para quién es

- Docentes, formadores y orientadores que preparan sesiones de IA para adultos.
- Equipos que necesitan justificar itinerarios y actividades con prudencia institucional.
- Alumnado adulto, mediante una vista simplificada de diagnóstico, módulo inicial y actividades guiadas.

## Qué hace

- Ayuda a decidir por dónde empezar según el perfil adulto.
- Ordena referentes oficiales y piezas formativas sin mezclarlas.
- Propone fichas metodológicas para convertir referentes en sesiones de aula.
- Ofrece una salida simplificada para alumnado: diagnóstico, checklist y microevaluación.
- Mantiene los datos en JSON para facilitar actualización humana del contexto.

## Qué incluye el MVP

- Portada con aviso institucional, propósito docente y privacidad básica.
- Recorrido guiado para entender el uso docente en pocos pasos.
- Sección de uso: para docentes, orientadores y alumnado.
- Mapa de formaciones y referentes oficiales en datos JSON.
- Ruta progresiva por 5 niveles.
- Fichas metodológicas docentes.
- Diagnóstico inicial local, orientativo y no oficial.
- Primer módulo interactivo: **IA sin humo: qué es, qué puede hacer y qué no debes hacer**.
- Checklist de seguridad y microevaluación con feedback inmediato.
- Documentación pedagógica, fuentes, privacidad y límites.

## Cómo ejecutarlo

La aplicación es estática. Para que los JSON carguen correctamente, conviene usar un servidor local:

```powershell
python -m http.server 8765
```

Después abre:

```text
http://127.0.0.1:8765/
```

También puede publicarse directamente en GitHub Pages.

## Publicación en GitHub Pages

1. Subir el repositorio a GitHub.
2. Entrar en `Settings > Pages`.
3. Seleccionar la rama principal y la carpeta raíz `/`.
4. Esperar a que GitHub Pages publique la web.

No requiere backend, base de datos, login ni compilación.

## Privacidad

Este recurso funciona de forma formativa y orientativa. No solicita datos personales sensibles ni envía respuestas a servidores externos. Si se usa en dispositivos compartidos, se recomienda borrar el progreso local al finalizar.

El diagnóstico guarda únicamente un perfil orientativo en `localStorage` del navegador. No hay analítica, cookies innecesarias ni formularios externos.

## Aviso institucional

El recurso usa un documento maestro de investigación como base para organizar información pública sobre especialidades formativas, estándares, cualificaciones, cursos programáticos y benchmarks formales. Su finalidad es orientativa, pedagógica y de portfolio.

No debe presentarse como material oficial ni como sustituto de programaciones, evaluaciones, certificados, fichas oficiales o materiales institucionales.

## Licencia

Pendiente de decisión. Recomendación inicial: licencia abierta para el código y licencia documental que permita reutilización con atribución, siempre preservando el aviso no oficial.

## Actualización del contexto

La actualización es humana y revisable. Las fichas pueden marcar estado, fecha de revisión, referentes, actividad, evidencia y salida para alumnado. En esta fase no hay scraping automático ni backend.

## Estado actual

MVP 0.3 en desarrollo. Primera versión publicada en GitHub Pages, reposicionada como kit metodológico docente y ajustada en experiencia de escritorio.

## Próximos pasos

- Revisar cada ficha contra fuentes oficiales actualizadas.
- Añadir validación de accesibilidad más completa.
- Revisar experiencia móvil con capturas reales y cerrar el patrón de desplegables.
- Añadir más fichas metodológicas y módulos formativos.
- Separar filtros por familia, nivel y tipo de pieza.
- Preparar una versión imprimible para aula.
- Definir licencia y política de contribución.
