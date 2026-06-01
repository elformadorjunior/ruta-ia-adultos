const DATA_PATHS = {
  catalogo: "data/catalogo-formaciones.json",
  itinerarios: "data/itinerarios-adultos.json",
  competencias: "data/mapa-competencias.json",
  fichas: "data/fichas-metodologicas.json"
};

const profileQuestions = [
  {
    text: "¿Puedes entrar en una plataforma de formación, descargar un archivo y volver a subir una tarea?",
    answers: [
      ["Todavía necesito ayuda frecuente.", "A"],
      ["Puedo hacerlo si la plataforma es sencilla.", "B"],
      ["Lo hago con autonomía.", "C"],
      ["Además puedo resolver incidencias básicas.", "D"]
    ]
  },
  {
    text: "¿Has usado alguna herramienta de IA generativa para estudiar o trabajar?",
    answers: [
      ["No, o solo he oído hablar de ella.", "A"],
      ["Sí, alguna vez y con dudas.", "B"],
      ["Sí, para resumir, redactar o practicar.", "C"],
      ["Sí, también pruebo automatizaciones o datos.", "D"]
    ]
  },
  {
    text: "Cuando una IA responde, ¿qué haces con esa información?",
    answers: [
      ["Me cuesta saber si es fiable.", "A"],
      ["La leo, pero necesito una guía para comprobarla.", "B"],
      ["La comparo con fuentes o apuntes.", "C"],
      ["Evalúo fuentes, sesgos, datos y límites técnicos.", "D"]
    ]
  },
  {
    text: "¿Qué objetivo te interesa ahora?",
    answers: [
      ["Ganar seguridad digital básica.", "A"],
      ["Entender qué es la IA y cómo empezar.", "B"],
      ["Aplicarla al estudio, empleo o productividad.", "C"],
      ["Avanzar hacia datos, modelos o automatización.", "D"]
    ]
  },
  {
    text: "¿Qué nivel técnico te resulta cómodo?",
    answers: [
      ["Correo, archivos y navegación básica.", "A"],
      ["Herramientas digitales habituales.", "B"],
      ["Prompts, documentos, hojas y tareas de oficina.", "C"],
      ["Datos, lógica, programación o sistemas.", "D"]
    ]
  },
  {
    text: "¿Cómo prefieres aprender?",
    answers: [
      ["Paso a paso y con acompañamiento.", "A"],
      ["Con ejemplos cortos y práctica guiada.", "B"],
      ["Con casos aplicados a mi trabajo o búsqueda de empleo.", "C"],
      ["Con retos técnicos y referentes competenciales.", "D"]
    ]
  }
];

const microQuestions = [
  {
    text: "¿Qué dato conviene no introducir en una herramienta de IA?",
    options: ["Un nombre real con DNI", "Un tema ficticio", "Una pregunta general"],
    correct: 0
  },
  {
    text: "Una respuesta de IA debe tratarse como...",
    options: ["Una verdad automática", "Un borrador que se verifica", "Una fuente oficial"],
    correct: 1
  },
  {
    text: "Para estudiar sin copiar, lo más adecuado es pedir...",
    options: ["La entrega completa", "Pistas, ejemplos y preguntas", "Una respuesta final para pegar"],
    correct: 1
  },
  {
    text: "Si la IA contradice tus apuntes o una fuente fiable, conviene...",
    options: ["Contrastar antes de usarlo", "Usarlo porque suena mejor", "Ignorar las fuentes"],
    correct: 0
  },
  {
    text: "El criterio humano es importante porque...",
    options: ["La IA siempre entiende el contexto", "Decide si el resultado es adecuado", "Evita tener que revisar"],
    correct: 1
  }
];

const profileLabels = {
  A: {
    title: "Perfil A: necesito empezar desde lo digital básico.",
    advice: "Empieza por Nivel 0 y Nivel 1. Prioriza seguridad, navegación, archivos, plataformas y primeras pruebas de IA con acompañamiento."
  },
  B: {
    title: "Perfil B: ya uso herramientas digitales, pero soy principiante en IA.",
    advice: "Empieza por Nivel 1. Practica prompts seguros, verificación de información y usos sencillos de apoyo al aprendizaje."
  },
  C: {
    title: "Perfil C: quiero aplicar IA al estudio, empleo o productividad.",
    advice: "Entra por Nivel 2 y Nivel 3. Trabaja con casos prácticos, productividad, orientación, comercio, marketing o tareas profesionales."
  },
  D: {
    title: "Perfil D: quiero avanzar hacia datos, modelos o automatización.",
    advice: "Revisa Nivel 4 y los referentes técnicos. Conecta tus evidencias con datos, machine learning, ECP y benchmarks formales."
  }
};

function renderCatalog(items) {
  const body = document.querySelector("#catalogo-body");
  body.innerHTML = items.map((item) => `
    <tr data-tipo="${item.tipoPieza}">
      <td><strong>${item.codigo}</strong></td>
      <td>${item.denominacion}</td>
      <td>${item.horas ?? "No visible"}</td>
      <td>${item.familiaArea}</td>
      <td><span class="type-pill">${item.tipoPieza}</span></td>
      <td>${item.nivelEstimado}</td>
      <td>${item.publicoModalidad || "No especificado"}</td>
      <td><a href="${item.fuente.url}" target="_blank" rel="noreferrer">${item.fuente.etiqueta}</a></td>
      <td>${item.observacionesPedagogicas}</td>
    </tr>
  `).join("");
}

function bindCatalogFilters(items) {
  document.querySelectorAll("[data-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-filter]").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      const filter = button.dataset.filter;
      renderCatalog(filter === "todas" ? items : items.filter((item) => item.tipoPieza === filter));
    });
  });
}

function renderItinerario(levels) {
  const list = document.querySelector("#itinerario-list");
  list.innerHTML = levels.map((level) => `
    <article class="level">
      <span class="number">${level.nivel}</span>
      <h3>${level.titulo}</h3>
      <p><strong>Objetivo:</strong> ${level.objetivo}</p>
      <p><strong>Para quién:</strong> ${level.paraQuien}</p>
      <p><strong>Competencias:</strong> ${level.competencias.join(", ")}.</p>
      <p><strong>Referentes:</strong> ${level.referentes.join(", ")}.</p>
      <p><strong>Actividad:</strong> ${level.actividadSugerida}</p>
      <p><strong>Evidencia:</strong> ${level.evidenciaAprendizaje}</p>
    </article>
  `).join("");
}

function renderFichas(fichas) {
  const list = document.querySelector("#fichas-list");
  list.innerHTML = fichas.map((ficha) => `
    <article class="method-card">
      <div class="method-card__meta">
        <span>${ficha.nivel}</span>
        <span>${ficha.estado}</span>
      </div>
      <h3>${ficha.titulo}</h3>
      <p><strong>Uso docente:</strong> ${ficha.usoDocente}</p>
      <p><strong>Actividad:</strong> ${ficha.actividad}</p>
      <p><strong>Evidencia:</strong> ${ficha.evidencia}</p>
      <p><strong>Salida alumnado:</strong> ${ficha.salidaAlumno}</p>
      <p class="small-note">Referentes: ${ficha.referentes.join(", ")} · Última revisión: ${ficha.ultimaRevision}</p>
    </article>
  `).join("");
}

function renderProfileQuestions() {
  const container = document.querySelector("#profile-questions");
  container.innerHTML = profileQuestions.map((question, index) => `
    <fieldset class="question">
      <legend>${index + 1}. ${question.text}</legend>
      ${question.answers.map(([label, value], answerIndex) => `
        <label>
          <input type="radio" name="profile-${index}" value="${value}" ${answerIndex === 0 ? "required" : ""}>
          ${label}
        </label>
      `).join("")}
    </fieldset>
  `).join("");
}

function bindProfileForm() {
  const form = document.querySelector("#profile-form");
  const result = document.querySelector("#profile-result");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const score = { A: 0, B: 0, C: 0, D: 0 };
    for (const value of data.values()) score[value] += 1;
    const profile = Object.entries(score).sort((a, b) => b[1] - a[1])[0][0];
    const label = profileLabels[profile];
    localStorage.setItem("efjRutaIaPerfil", profile);
    result.className = "result good";
    result.innerHTML = `<strong>${label.title}</strong><br>${label.advice}<br><small>Resultado orientativo, no oficial. Guardado solo en este navegador.</small>`;
  });

  document.querySelector("#clear-progress").addEventListener("click", () => {
    localStorage.removeItem("efjRutaIaPerfil");
    form.reset();
    result.className = "result";
    result.textContent = "Progreso local borrado en este navegador.";
  });
}

function renderMicroQuestions() {
  const container = document.querySelector("#micro-questions");
  container.innerHTML = microQuestions.map((question, index) => `
    <fieldset>
      <legend><strong>${index + 1}. ${question.text}</strong></legend>
      ${question.options.map((option, optionIndex) => `
        <label>
          <input type="radio" name="micro-${index}" value="${optionIndex}" ${optionIndex === 0 ? "required" : ""}>
          ${option}
        </label>
      `).join("")}
    </fieldset>
  `).join("");
}

function bindMicroForm() {
  const form = document.querySelector("#micro-form");
  const result = document.querySelector("#micro-result");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const score = microQuestions.reduce((total, question, index) => {
      return total + (Number(data.get(`micro-${index}`)) === question.correct ? 1 : 0);
    }, 0);
    result.className = score >= 4 ? "result good" : "result warn";
    result.textContent = score >= 4
      ? `Resultado: ${score}/5. Buen criterio inicial. Mantén verificación y revisión humana.`
      : `Resultado: ${score}/5. Repasa privacidad, verificación y uso de IA como apoyo, no como sustituto.`;
  });
}

function bindSafetyChecklist() {
  const checks = Array.from(document.querySelectorAll(".safety-check"));
  const result = document.querySelector("#safety-result");
  const update = () => {
    const done = checks.filter((check) => check.checked).length;
    result.className = done === checks.length ? "result good" : "result";
    result.textContent = done === checks.length
      ? "Checklist completa. Tu propuesta evita los riesgos básicos."
      : `Checklist: ${done}/${checks.length} puntos revisados.`;
  };
  checks.forEach((check) => check.addEventListener("change", update));
  update();
}

function bindNav() {
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.querySelector("#nav-menu");
  toggle.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
}

async function init() {
  bindNav();
  renderProfileQuestions();
  bindProfileForm();
  renderMicroQuestions();
  bindMicroForm();
  bindSafetyChecklist();

  const [catalogo, itinerarios, fichas] = await Promise.all([
    fetch(DATA_PATHS.catalogo).then((response) => response.json()),
    fetch(DATA_PATHS.itinerarios).then((response) => response.json()),
    fetch(DATA_PATHS.fichas).then((response) => response.json())
  ]);
  renderCatalog(catalogo.formaciones);
  bindCatalogFilters(catalogo.formaciones);
  renderItinerario(itinerarios.niveles);
  renderFichas(fichas.fichas);
}

init().catch((error) => {
  document.querySelector("#catalogo-body").innerHTML = `<tr><td colspan="9">No se pudieron cargar los datos del catálogo. Prueba desde un servidor local o GitHub Pages.</td></tr>`;
  console.error(error);
});
