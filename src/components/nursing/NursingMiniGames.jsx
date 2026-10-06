import { useState } from 'react'
import { errorScenarios, priorityScenarios } from '../../data/nursingCases'

const randomFrom = (items) => items[Math.floor(Math.random() * items.length)]
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

function NumericGame({ title, createCase, onRecordAnswer }) {
  const [caseData, setCaseData] = useState(createCase)
  const [value, setValue] = useState('')
  const [feedback, setFeedback] = useState(null)

  const verify = (event) => {
    event.preventDefault()
    if (feedback) return
    const numericValue = Number(String(value).replace(',', '.'))
    const correct = Number.isFinite(numericValue) && Math.abs(numericValue - caseData.answer) <= caseData.tolerance
    setFeedback({ correct })
    onRecordAnswer(correct, 75)
  }

  const next = () => {
    setCaseData(createCase())
    setValue('')
    setFeedback(null)
  }

  return (
    <div className="mini-game-sheet">
      <div className="module-kicker">{title}</div>
      <h3>{caseData.heading}</h3>
      {caseData.lines.map((line) => <p key={line}>{line}</p>)}
      <form onSubmit={verify} className="numeric-answer">
        <label>{caseData.prompt}<input type="text" inputMode="decimal" value={value} onChange={(event) => setValue(event.target.value)} disabled={Boolean(feedback)} /></label>
        <button type="submit" className="module-button" disabled={!value || Boolean(feedback)}>VERIFICAR</button>
      </form>
      {feedback && (
        <div className={feedback.correct ? 'answer-feedback is-correct' : 'answer-feedback is-wrong'} role="status">
          <strong>{feedback.correct ? 'RESPUESTA CORRECTA' : 'RESPUESTA INCORRECTA'}</strong>
          <p>{caseData.explanation}</p>
          <button type="button" className="secondary-medical-button" onClick={next}>GENERAR OTRO CASO</button>
        </div>
      )}
    </div>
  )
}

function createMedicationCase() {
  const cases = [
    { ordered: 750, available: 500, volume: 2 },
    { ordered: 300, available: 200, volume: 1 },
    { ordered: 125, available: 250, volume: 5 },
    { ordered: 600, available: 1000, volume: 10 },
  ]
  const item = randomFrom(cases)
  const answer = (item.ordered * item.volume) / item.available
  return {
    heading: 'PREPARACIÓN DE MEDICACIÓN',
    lines: [`Indicación: ${item.ordered} mg`, `Disponible: ${item.available} mg / ${item.volume} mL`],
    prompt: '¿Cuántos mL administrarías?',
    answer,
    tolerance: 0.01,
    explanation: `${item.ordered} × ${item.volume} / ${item.available} = ${answer.toLocaleString('es-AR')} mL.`,
  }
}

function createInfusionCase() {
  const hours = randomInt(2, 8)
  const rate = randomFrom([50, 75, 100, 125])
  const volume = hours * rate
  return {
    heading: 'BOMBA DE INFUSIÓN',
    lines: [`Volumen total: ${volume} mL`, `Tiempo: ${hours} horas`],
    prompt: 'Configure la bomba (mL/h)',
    answer: rate,
    tolerance: 0.01,
    explanation: `${volume} mL / ${hours} h = ${rate} mL/h.`,
  }
}

function createDripCase() {
  const factor = randomFrom([15, 20, 60])
  const hours = randomFrom([2, 4, 5, 8])
  const target = randomFrom(factor === 60 ? [40, 50, 60, 75] : [20, 25, 30, 40])
  const volume = Math.round((target * hours * 60) / factor)
  const answer = Math.round((volume * factor) / (hours * 60))
  return {
    heading: 'CÁLCULO DE GOTEO',
    lines: [`Volumen: ${volume} mL`, `Tiempo: ${hours} horas`, `Factor: ${factor} gotas/mL`],
    prompt: 'Resultado (gotas/min)',
    answer,
    tolerance: 0.5,
    explanation: `(${volume} × ${factor}) / (${hours} × 60) ≈ ${answer} gotas/min.`,
  }
}

const eyeOptions = [{ label: 'Espontánea', score: 4 }, { label: 'A la voz', score: 3 }, { label: 'Al dolor', score: 2 }, { label: 'Ninguna', score: 1 }]
const verbalOptions = [{ label: 'Orientada', score: 5 }, { label: 'Confusa', score: 4 }, { label: 'Palabras inapropiadas', score: 3 }, { label: 'Sonidos incomprensibles', score: 2 }, { label: 'Ninguna', score: 1 }]
const motorOptions = [{ label: 'Obedece órdenes', score: 6 }, { label: 'Localiza dolor', score: 5 }, { label: 'Retira al dolor', score: 4 }, { label: 'Flexión anormal', score: 3 }, { label: 'Extensión', score: 2 }, { label: 'Ninguna', score: 1 }]

function createGlasgowCase() {
  const eye = randomFrom(eyeOptions)
  const verbal = randomFrom(verbalOptions)
  const motor = randomFrom(motorOptions)
  const answer = eye.score + verbal.score + motor.score
  return {
    heading: 'ESCALA DE GLASGOW',
    lines: [`Apertura ocular: ${eye.label}`, `Respuesta verbal: ${verbal.label}`, `Respuesta motora: ${motor.label}`],
    prompt: 'Glasgow total',
    answer,
    tolerance: 0,
    explanation: `E${eye.score} + V${verbal.score} + M${motor.score} = ${answer}.`,
  }
}

function createBalanceCase() {
  const iv = randomInt(5, 12) * 100
  const oral = randomInt(2, 7) * 50
  const urine = randomInt(4, 11) * 100
  const drainage = randomInt(1, 5) * 30
  const answer = iv + oral - urine - drainage
  return {
    heading: 'BALANCE HÍDRICO',
    lines: [`Ingresos: suero ${iv} mL + vía oral ${oral} mL`, `Egresos: diuresis ${urine} mL + drenaje ${drainage} mL`],
    prompt: 'Balance final (mL; usar signo si es negativo)',
    answer,
    tolerance: 0,
    explanation: `Ingresos ${iv + oral} − egresos ${urine + drainage} = ${answer > 0 ? '+' : ''}${answer} mL.`,
  }
}

function ChoiceScenario({ type, scenarios, onRecordAnswer }) {
  const [scenario, setScenario] = useState(() => randomFrom(scenarios))
  const [feedback, setFeedback] = useState(null)
  const options = scenario.patients || scenario.options

  const answer = (index) => {
    if (feedback) return
    const correct = index === scenario.correct
    setFeedback({ correct })
    onRecordAnswer(correct, 75)
  }

  const next = () => {
    const alternatives = scenarios.filter((item) => item.id !== scenario.id)
    setScenario(randomFrom(alternatives.length ? alternatives : scenarios))
    setFeedback(null)
  }

  return (
    <div className="mini-game-sheet">
      <div className="module-kicker">{type}</div>
      <h3>{scenario.prompt || '¿Cuál es el error principal?'}</h3>
      {scenario.situation && <p className="scenario-box">{scenario.situation}</p>}
      <div className="nursing-options">
        {options.map((option, index) => <button type="button" key={option} onClick={() => answer(index)} disabled={Boolean(feedback)} className={feedback && index === scenario.correct ? 'correct-option' : ''}>{option}</button>)}
      </div>
      {feedback && (
        <div className={feedback.correct ? 'answer-feedback is-correct' : 'answer-feedback is-wrong'} role="status">
          <strong>{feedback.correct ? 'RESPUESTA CORRECTA' : 'RESPUESTA INCORRECTA'}</strong>
          <p>{scenario.explanation}</p>
          <button type="button" className="secondary-medical-button" onClick={next}>OTRO ESCENARIO</button>
        </div>
      )}
    </div>
  )
}

const games = [
  ['medication', 'Preparar medicación'],
  ['infusion', 'Bomba de infusión'],
  ['drip', 'Goteo'],
  ['priority', 'Priorizar pacientes'],
  ['error', 'Detectar el error'],
  ['glasgow', 'Glasgow'],
  ['balance', 'Balance hídrico'],
]

export default function NursingMiniGames({ onRecordAnswer, onExit }) {
  const [game, setGame] = useState('medication')
  return (
    <div>
      <div className="evaluation-header"><span>LABORATORIO DE PROCEDIMIENTOS</span><button type="button" className="text-medical-button" onClick={onExit}>VOLVER AL PANEL</button></div>
      <div className="mini-game-tabs" role="tablist" aria-label="Minijuegos de enfermería">
        {games.map(([id, label]) => <button type="button" role="tab" aria-selected={game === id} className={game === id ? 'selected' : ''} key={id} onClick={() => setGame(id)}>{label}</button>)}
      </div>
      {game === 'medication' && <NumericGame title="CÁLCULO DE DOSIS" createCase={createMedicationCase} onRecordAnswer={onRecordAnswer} />}
      {game === 'infusion' && <NumericGame title="INFUSIÓN" createCase={createInfusionCase} onRecordAnswer={onRecordAnswer} />}
      {game === 'drip' && <NumericGame title="GOTEO" createCase={createDripCase} onRecordAnswer={onRecordAnswer} />}
      {game === 'glasgow' && <NumericGame title="VALORACIÓN NEUROLÓGICA" createCase={createGlasgowCase} onRecordAnswer={onRecordAnswer} />}
      {game === 'balance' && <NumericGame title="BALANCE" createCase={createBalanceCase} onRecordAnswer={onRecordAnswer} />}
      {game === 'priority' && <ChoiceScenario type="PRIORIZAR PACIENTES" scenarios={priorityScenarios} onRecordAnswer={onRecordAnswer} />}
      {game === 'error' && <ChoiceScenario type="DETECTAR EL ERROR" scenarios={errorScenarios} onRecordAnswer={onRecordAnswer} />}
    </div>
  )
}
