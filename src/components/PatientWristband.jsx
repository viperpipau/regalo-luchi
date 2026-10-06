const ADMISSION_DATE = '06/10/2026'

const WRISTBAND_DATA = [
  ['PACIENTE', 'PAULINA'],
  ['SERVICIO', 'CARDIOLOGÍA EMOCIONAL'],
  ['ALERGIA', 'DISTANCIA DE LUCIO'],
  ['GRUPO', 'L♡'],
  ['ESTADO', 'EN OBSERVACIÓN'],
  ['RESPONSABLE', 'LUCHI'],
]

function downloadWristband() {
  const canvas = document.createElement('canvas')
  canvas.width = 1400
  canvas.height = 520
  const context = canvas.getContext('2d')

  context.fillStyle = '#fff7fa'
  context.fillRect(0, 0, canvas.width, canvas.height)
  context.strokeStyle = '#e96588'
  context.lineWidth = 10
  context.strokeRect(24, 24, canvas.width - 48, canvas.height - 48)
  context.fillStyle = '#d95177'
  context.fillRect(24, 24, 270, canvas.height - 48)
  context.fillStyle = '#ffffff'
  context.font = '700 42px Arial'
  context.fillText('LOVE CARE', 55, 105)
  context.font = '700 54px Arial'
  context.fillText('EXP-001-P', 55, 190)
  context.font = '28px Arial'
  context.fillText(`INGRESO`, 55, 275)
  context.fillText(ADMISSION_DATE, 55, 320)
  context.font = '70px Arial'
  context.fillText('♡', 110, 430)

  context.fillStyle = '#482f39'
  WRISTBAND_DATA.forEach(([label, value], index) => {
    const column = index % 2
    const row = Math.floor(index / 2)
    const x = 345 + column * 500
    const y = 100 + row * 130
    context.fillStyle = '#bd7186'
    context.font = '700 21px Arial'
    context.fillText(label, x, y)
    context.fillStyle = '#482f39'
    context.font = '700 31px Arial'
    context.fillText(value, x, y + 42)
  })

  const link = document.createElement('a')
  link.download = 'pulsera-exp-001-p.png'
  link.href = canvas.toDataURL('image/png')
  link.click()
}

export default function PatientWristband() {
  return (
    <section className="module patient-identification" id="identificacion">
      <div className="module-kicker">IDENTIFICACIÓN DEL PACIENTE</div>
      <div className="wristband">
        <div className="wristband-code">
          <span>LOVE CARE · ID</span>
          <strong>EXP-001-P</strong>
          <small>INGRESO {ADMISSION_DATE}</small>
        </div>
        <dl>
          {WRISTBAND_DATA.map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </div>
      <button className="module-button" type="button" onClick={downloadWristband}>
        DESCARGAR PULSERA
      </button>
    </section>
  )
}
