const boton = document.getElementById("btnCuidar");
const mensaje = document.getElementById("mensaje");

boton.addEventListener("click", function () {

  mensaje.classList.remove("oculto");

  boton.style.display = "none";

});
