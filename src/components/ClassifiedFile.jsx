export default function ClassifiedFile({ progress }) {
  const completedCount = Object.values(progress).filter(Boolean).length
  const unlocked = completedCount === 3

  return (
    <section className={unlocked ? 'module classified-file unlocked' : 'module classified-file'} id="archivo-clasificado">
      <div className="module-kicker">ARCHIVO CLASIFICADO Nº 002</div>
      {!unlocked ? (
        <div className="classified-locked">
          <div className="lock-mark" aria-hidden="true">⌁</div>
          <h2>ACCESO RESTRINGIDO</h2>
          <p>Complete los procedimientos requeridos para obtener autorización.</p>
          <strong>PROCEDIMIENTOS COMPLETADOS: {completedCount} / 3</strong>
          <div className="classified-progress" aria-label={`${completedCount} de 3 procedimientos completados`}>
            <span style={{ width: `${(completedCount / 3) * 100}%` }} />
          </div>
        </div>
      ) : (
        <UnlockedFile />
      )}
    </section>
  )
}

function UnlockedFile() {
  const [open, setOpen] = useState(false)

  return (
    <div className="classified-unlocked">
      <h2>AUTORIZACIÓN CONCEDIDA</h2>
      {!open ? (
        <button className="module-button" type="button" onClick={() => setOpen(true)}>ABRIR ARCHIVO</button>
      ) : (
        <article className="secret-file" aria-live="polite">
          <p>Si llegaste hasta acá significa que oficialmente completaste el expediente.</p>
          <p>Aunque, para ser sincera, el diagnóstico estaba bastante claro desde el principio.</p>
          <p>Me hacés muy feliz.</p>
          <p>Y sí, el tratamiento sigue siendo vos.</p>
          <strong>DOCUMENTO DESCLASIFICADO</strong>
        </article>
      )}
    </div>
  )
}
import { useState } from 'react'
