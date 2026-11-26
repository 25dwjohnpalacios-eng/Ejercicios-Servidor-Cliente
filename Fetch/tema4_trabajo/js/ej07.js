const boton = document.getElementById("cargar");
const estado = document.getElementById("estado");

boton.addEventListener("click", cargar);

async function obtenerAlumnos() {
  const input = document.getElementById("q").value;
  const parametros = new URLSearchParams({ q: input });
  const r = await fetch(`api/alumnos.php?${parametros}`);
  await new Promise((resolve, reject) => {
    setTimeout(resolve, 3000)
  });
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
  const lista = document.getElementById("lista");

  lista.replaceChildren();
  estado.textContent = "Cargando…";
  try {
    boton.disabled = true;
    const alumnos = await obtenerAlumnos();
    pintar(alumnos);
    estado.textContent = alumnos.length ? "Listo" : "Sin resultados";
  } catch (error) {
    lista.replaceChildren();
    estado.textContent = "No se a podido cargar los alumnos";
  } finally {
    boton.disabled = false;
  }
}
