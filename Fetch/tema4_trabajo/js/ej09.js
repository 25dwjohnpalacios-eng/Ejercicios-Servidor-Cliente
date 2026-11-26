const formulario = document.getElementById("formulario");

formulario.addEventListener("submit", async (e) => {
  e.preventDefault();

  const datos = new FormData(formulario);

  const r = await fetch("api/eco-form.php", {
    method: "POST",
    body: datos,
  });

  const respuesta = await r.json();

  const mensaje = document.getElementById("mensaje");
  mensaje.textContent = respuesta.datos;
});
