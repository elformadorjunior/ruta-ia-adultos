# Ruta IA para Adultos · El Formador Junior

MVP 0.1 de una herramienta educativa progresiva para personas adultas en contexto de Formación Profesional para el Empleo, formación no reglada, alfabetización digital, empleabilidad e inteligencia artificial aplicada al aprendizaje y al trabajo.

Este proyecto pertenece a la línea personal y de portfolio técnico-docente de **El Formador Junior**. No es un recurso oficial del Servicio Canario de Empleo, SEPE, BOE, ICSE ni de ninguna entidad pública o privada.

## Para quién es

- Personas adultas con distintos niveles digitales.
- Formadores, orientadores o perfiles docentes que quieran ordenar recursos de IA con prudencia.
- Personas que buscan una primera ruta clara para entender IA, IA generativa, productividad, empleo, datos y límites éticos.

## Qué incluye el MVP

- Portada con aviso institucional y privacidad básica.
- Mapa de formaciones y referentes oficiales en datos JSON.
- Ruta progresiva por 5 niveles.
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

## Estado actual

MVP 0.1 en desarrollo. Primera versión navegable, estática y documentada.

## Próximos pasos

- Revisar cada ficha contra fuentes oficiales actualizadas.
- Añadir validación de accesibilidad más completa.
- Añadir más módulos formativos.
- Separar filtros por familia, nivel y tipo de pieza.
- Preparar una versión imprimible para aula.
- Definir licencia y política de contribución.
