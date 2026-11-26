const boton = document.getElementById("probar");

const estado = document.getElementById("estado");


boton.addEventListener("click", comprobar);

async function comprobar() {
    const caso = document.getElementById("caso");
  
    let url;

    switch (caso.value){
        case "correcto":
            url = `api/alumnos.php`;
            break;
        case "http":
            url = `api/fallo.php?tipo=http`;
            break;
        case "json":
            url = `api/fallo.php?tipo=json`;
            break;
        case "app":
            url = `api/fallo.php?tipo=app`;
            break;
        default:
            console.log("Valor no válido");
            break;

    }
    console.log(url);
    const r = await fetch(url);
    const cuerpo = await r.json();
    if (!cuerpo.ok) throw new Error("Consulta rechazada");
    
    pintar(cuerpo.datos);


}

function pintar(alumnos) {
  const lista = document.querySelector("#estado");
  lista.replaceChildren();
  for (const alumno of alumnos) {
    const li = document.createElement("li");
    li.textContent = alumno.nombre;
    lista.append(li);
  }
}