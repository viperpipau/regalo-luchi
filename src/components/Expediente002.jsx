export default function Expediente002() {
  return (
    <section className="expediente-closing" aria-label="Cierre del expediente">
      <div className="closed-case">
        <span>CASO Nº 001</span>
        <strong>ESTADO: CERRADO</strong>
      </div>
      <div className="closing-transition" aria-hidden="true"><span>♡</span></div>
      <div className="next-file">
        <div className="module-kicker">CONTINUACIÓN DEL ARCHIVO</div>
        <h2>EXPEDIENTE Nº 002</h2>
        <strong>🔒 AÚN NO DISPONIBLE</strong>
        <p>Fecha de apertura: algún día que todavía no vivimos.</p>
        <div className="next-file-note">
          <span>Hay cosas que todavía no pasaron.</span>
          <span>Habrá que seguir llenando el expediente.</span>
        </div>
      </div>
    </section>
  )
}
