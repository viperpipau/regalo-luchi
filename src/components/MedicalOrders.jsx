import { useEffect, useState } from 'react'

const VALID_ORDERS = [
  '1 abrazo cada 8 horas',
  'Besos PRN',
  'Hacer reír a la paciente diariamente',
  'Mensajes de buenos días según tolerancia',
  'Dormir juntos cuando sea posible',
  'Recordarle que es querida',
]

export default function MedicalOrders({ completed, onComplete }) {
  const [checked, setChecked] = useState(() =>
    completed ? new Set(VALID_ORDERS.map((_, index) => index)) : new Set(),
  )
  const [errorVisible, setErrorVisible] = useState(false)

  useEffect(() => {
    if (checked.size === VALID_ORDERS.length) onComplete()
  }, [checked, onComplete])

  const toggleOrder = (index) => {
    setErrorVisible(false)
    setChecked((current) => {
      const next = new Set(current)
      if (next.has(index)) next.delete(index)
      else next.add(index)
      return next
    })
  }

  return (
    <section className="module medical-orders" id="ordenes">
      <div className="module-kicker">ÓRDENES MÉDICAS</div>
      <h2>Hoja de indicaciones</h2>
      <div className="orders-list">
        {VALID_ORDERS.map((order, index) => (
          <label className={checked.has(index) ? 'order-item checked' : 'order-item'} key={order}>
            <input
              type="checkbox"
              checked={checked.has(index)}
              onChange={() => toggleOrder(index)}
            />
            <span className="order-box" aria-hidden="true" />
            <span>{order}</span>
          </label>
        ))}
        <label className="order-item contraindicated">
          <input
            type="checkbox"
            checked={false}
            onChange={() => setErrorVisible(true)}
          />
          <span className="order-box" aria-hidden="true" />
          <span>Dejar de gustarle</span>
        </label>
      </div>
      {errorVisible && (
        <div className="medical-error" role="alert">
          <strong>ERROR: procedimiento contraindicado.</strong>
          <span>Motivo: riesgo elevado de empeoramiento del cuadro emocional.</span>
        </div>
      )}
      {checked.size === VALID_ORDERS.length && (
        <p className="procedure-complete" role="status">✓ Indicaciones válidas administradas.</p>
      )}
    </section>
  )
}
