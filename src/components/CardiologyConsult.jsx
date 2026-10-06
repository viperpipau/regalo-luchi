import { useState } from 'react'

export default function CardiologyConsult({ completed, onComplete }) {
  const [revealed, setRevealed] = useState(completed)

  const revealConsult = () => {
    setRevealed(true)
    onComplete()
  }

  return (
    <section className="module cardiology-consult" id="interconsulta">
      <div className="module-kicker">INTERCONSULTA · CARDIOLOGÍA</div>
      <p className="consult-reason"><b>Motivo de consulta:</b> episodios recurrentes de taquicardia.</p>
      {!revealed ? (
        <button className="module-button" type="button" onClick={revealConsult}>
          SOLICITAR INTERCONSULTA
        </button>
      ) : (
        <article className="consult-report" aria-live="polite">
          <strong>SERVICIO: CARDIOLOGÍA</strong>
          <p><b>Motivo:</b> taquicardia recurrente, sensación de calor y sonrisa persistente.</p>
          <p><b>Factores desencadenantes:</b> presencia, mensajes o voz de Lucio.</p>
          <p><b>ECG:</b> ritmo sinusal con alteraciones compatibles con enamoramiento.</p>
          <p><b>Hallazgos:</b> sin patología cardíaca estructural.</p>
          <p><b>Diagnóstico presuntivo:</b> enamoramiento agudo.</p>
          <p><b>Conducta:</b> continuar exposición al desencadenante.</p>
          <div className="consult-finished">
            <strong>INTERCONSULTA FINALIZADA</strong>
            <span>No requiere tratamiento. Solo seguimiento por enfermería.</span>
          </div>
        </article>
      )}
    </section>
  )
}
