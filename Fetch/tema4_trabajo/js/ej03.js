const boton = document.getElementById("pedir");

boton.addEventListener('click', consultar);

async function consultar() {
  const r = await fetch("api/saludo.php");
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  const texto = await r.text();
  document.querySelector("#salida").textContent = texto;
}
