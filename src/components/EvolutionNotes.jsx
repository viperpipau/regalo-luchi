import { useState } from 'react'

const NOTES = [
  'Paciente refiere extrañar al enfermero.',
  'Se observa sonrisa involuntaria al mencionar a Lucio.',
  'Continúa tratamiento con mensajes, besos y abrazos.',
  'Paciente evoluciona favorablemente después de recibir atención del enfermero.',
  'Se recomienda continuar tratamiento afectivo por tiempo indeterminado.',
  'Sin signos de mejoría respecto a dejar de enamorarse.',
]

export default function EvolutionNotes() {
  const [noteIndex, setNoteIndex] = useState(0)

  return (
    <section className="module evolution-notes" id="evolucion">
      <div className="module-kicker">NOTAS DE EVOLUCIÓN</div>
      <div className="evolution-sheet" aria-live="polite">
        <div className="evolution-meta">
          <strong>EVOLUCIÓN Nº {String(noteIndex + 1).padStart(2, '0')}</strong>
          <span>{String(14 + noteIndex).padStart(2, '0')}:30 HS</span>
        </div>
        <p>{NOTES[noteIndex]}</p>
        <small>Firma y sello · Enfermería emocional</small>
      </div>
      <button
        className="module-button"
        type="button"
        onClick={() => setNoteIndex((current) => (current + 1) % NOTES.length)}
      >
        VER PRÓXIMA EVOLUCIÓN
      </button>
    </section>
  )
}
