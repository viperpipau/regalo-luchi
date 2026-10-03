const medicamentos =
  document.querySelectorAll(".medicamento");

const receta =
  document.getElementById("receta");


const mensajes = {

  abrazo:
    "💗 Indicación: administrar un abrazo de Lucio inmediatamente. Repetir cada vez que Paulina necesite sentirse segura.",

  beso:
    "💋 Indicación: un beso de esos que hacen que por un ratito se te olvide todo lo demás.",

  mimos:
    "🧸 Indicación: mimos sin límite de tiempo. No se conocen efectos adversos.",

  extraño:
    "💌 Resultado esperado: ganas repentinas de buscar a Lucio, escribirle y decirle cuánto lo extrañás.",

  quedate:
    "🫶 Indicación especial: quedarse. No tiene horario de vencimiento."
};


medicamentos.forEach(function(medicamento) {

  medicamento.addEventListener("click", function() {

    const tipo =
      medicamento.dataset.medicamento;

    receta.textContent =
      mensajes[tipo];

    receta.classList.remove("oculto");

  });

});
