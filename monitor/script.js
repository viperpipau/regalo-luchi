const boton =
  document.getElementById("diagnosticar");

const resultado =
  document.getElementById("resultado");


boton.addEventListener("click", function() {

  resultado.classList.remove("oculto");

  boton.style.display = "none";

});
