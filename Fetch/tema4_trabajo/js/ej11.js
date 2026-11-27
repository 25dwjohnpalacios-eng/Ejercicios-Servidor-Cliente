const formulario = document.getElementById("formulario");

formulario.addEventListener("submit", async (e) => {
  e.preventDefault();

  const datos = new FormData(formulario);

  const r = await fetch("api/eco-json.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      nombre: "Ana",
      email: "ana@example.com",
    }),
  });
  const cuerpo = await r.json();

  const mensaje = document.getElementById("mensaje");
  mensaje.textContent = cuerpo.datos;
});
