const boton = document.getElementById("cargar");
const estado = document.getElementById("estado");


boton.addEventListener("click", cargar);

async function obtenerAlumnos() {
  const input = document.getElementById("q").value;
  const parametros = new URLSearchParams({ q: input });
  const r = await fetch(`api/alumnos.php?${parametros}`);
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  const cuerpo = await r.json();
  if (!cuerpo.ok) throw new Error("Consulta rechazada");
  return cuerpo.datos;
}

function pintar(alumnos) {
  const lista = document.querySelector("#lista");
  lista.replaceChildren();
  for (const alumno of alumnos) {
    const li = document.createElement("li");
    li.textContent = alumno.nombre;
    lista.append(li);
  }
}

async function cargar() {
  boton.disabled = true;
  estado.textContent = "Cargando…";
  try {
    const alumnos = await obtenerAlumnos();
    pintar(alumnos);
    estado.textContent = alumnos.length ? "Listo" : "Sin resultados";
  } catch (error) {
    estado.textContent = error.message;
  } finally {
    boton.disabled = false;
  }
}
