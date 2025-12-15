
const ramos = document.querySelectorAll(".ramo");

let aprobados = JSON.parse(localStorage.getItem("aprobados")) || [];

// Marcar aprobados al cargar
aprobados.forEach(id => {
  const ramo = document.querySelector(`[data-id="${id}"]`);
  if (ramo) ramo.classList.add("aprobado");
});

// Función para bloquear / desbloquear ramos
function actualizarBloqueos() {
  ramos.forEach(ramo => {
    const prereq = ramo.dataset.prereq;
    if (prereq && !aprobados.includes(prereq)) {
      ramo.classList.add("bloqueado");
    } else {
      ramo.classList.remove("bloqueado");
    }
  });
}

actualizarBloqueos();

// Click para aprobar
ramos.forEach(ramo => {
  ramo.addEventListener("click", () => {
    if (ramo.classList.contains("bloqueado")) return;

    const id = ramo.dataset.id;
    if (!id) return;

    if (!ramo.classList.contains("aprobado")) {
      ramo.classList.add("aprobado");
      aprobados.push(id);
      localStorage.setItem("aprobados", JSON.stringify(aprobados));
      actualizarBloqueos();
    }
  });
});
