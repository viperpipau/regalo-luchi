import { useEffect, useRef, useState } from 'react'
import './ExpedienteCover.css'

export const EXPEDIENTE_OPEN_DATE = '06 / 10 / 2026'

export default function ExpedienteCover({ onOpen }) {
  const [opening, setOpening] = useState(false)
  const timerRef = useRef(null)

  useEffect(() => () => window.clearTimeout(timerRef.current), [])

  const openFile = () => {
    if (opening) return
    setOpening(true)
    timerRef.current = window.setTimeout(onOpen, 360)
  }

  return (
    <main className={opening ? 'expediente-cover is-opening' : 'expediente-cover'}>
      <section className="cover-folder" aria-labelledby="cover-title">
        <div className="cover-tab">LOVE CARE · ARCHIVO 001</div>
        <div className="cover-seal" aria-hidden="true">CONFIDENCIAL</div>
        <div className="module-kicker">DOCUMENTACIÓN CLÍNICA · USO AUTORIZADO</div>
        <div className="cover-mark" aria-hidden="true">♡</div>
        <h1 id="cover-title">EXPEDIENTE CLÍNICO<br />CONFIDENCIAL</h1>
        <div className="cover-number">EXPEDIENTE Nº 001</div>

        <dl className="cover-data">
          <div><dt>PACIENTE</dt><dd>PAULINA</dd></div>
          <div><dt>RESPONSABLE</dt><dd>LUCHI</dd></div>
          <div><dt>SERVICIO</dt><dd>CARDIOLOGÍA EMOCIONAL</dd></div>
          <div><dt>CLASIFICACIÓN</dt><dd>CONFIDENCIAL</dd></div>
          <div><dt>ESTADO</dt><dd>EN SEGUIMIENTO</dd></div>
          <div><dt>FECHA DE APERTURA</dt><dd>{EXPEDIENTE_OPEN_DATE}</dd></div>
        </dl>

        <div className="cover-restricted">ACCESO RESTRINGIDO</div>
        <button type="button" className="start-button" onClick={openFile} disabled={opening}>
          ABRIR EXPEDIENTE <span>♡</span>
        </button>
      </section>
    </main>
  )
}
