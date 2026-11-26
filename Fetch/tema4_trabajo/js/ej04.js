const boton = document.getElementById("enviar");

boton.addEventListener('click', consultar);

function consultar() {
  fetch("api/saludo.php")
    .then((respuesta) => respuesta.text())
    .then((texto) => (document.querySelector("#respuesta").textContent = texto))
    .catch((error) => console.error(error));
}
