import { useEffect, useMemo, useState } from 'react'
import { expediente002Levels, expediente002Questions } from '../data/expediente002Questions'
import './expediente/Expediente002.css'

const STORAGE_KEY = 'expediente002_nurse_challenge'
const MESSAGE = 'No importa que todo haya salido mal, siempre vas a ser el mejor y nadie lo puede negar ♥️'
const MESSAGE_CHARACTERS = Array.from(MESSAGE)

function freshProgress() {
  return {
    started: false,
    current: 0,
    answers: [],
    timerEnabled: false,
    elapsedSeconds: 0,
    completed: false,
    revealed: false,
    medalReceived: false,
  }
}

function loadProgress() {
  try {
    const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY))
    if (!saved || typeof saved !== 'object') return { progress: freshProgress(), warning: '' }
    const seenQuestions = new Set()
    const answers = Array.isArray(saved.answers)
      ? saved.answers.filter((answer) => {
        const valid = Number.isInteger(answer?.questionIndex)
          && answer.questionIndex >= 0
          && answer.questionIndex < expediente002Questions.length
          && Number.isInteger(answer.selected)
          && answer.selected >= 0
          && answer.selected < 4
          && !seenQuestions.has(answer.questionIndex)
        if (valid) seenQuestions.add(answer.questionIndex)
        return valid
      }).slice(0, expediente002Questions.length)
      : []
    return {
      progress: {
        started: Boolean(saved.started),
        current: Math.min(expediente002Questions.length - 1, Math.max(0, Number(saved.current) || 0)),
        answers,
        timerEnabled: Boolean(saved.timerEnabled),
        elapsedSeconds: Math.max(0, Number(saved.elapsedSeconds) || 0),
        completed: Boolean(saved.completed) && answers.length === expediente002Questions.length,
        revealed: Boolean(saved.revealed) && answers.length === expediente002Questions.length,
        medalReceived: Boolean(saved.medalReceived) && answers.length === expediente002Questions.length,
      },
      warning: '',
    }
  } catch {
    return {
      progress: freshProgress(),
      warning: 'No se pudo leer el progreso guardado en este navegador.',
    }
  }
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60).toString().padStart(2, '0')
  const remainder = (seconds % 60).toString().padStart(2, '0')
  return `${minutes}:${remainder}`
}

function MonitorLine() {
  return (
    <svg className="exp002-monitor-line" viewBox="0 0 640 74" role="img" aria-label="Monitor cardíaco animado">
      <path d="M0 39h140l18-1 14-1 14-25 16 53 18-36 13 10h34l14-1 14-23 16 40 17-28 15 12h83l15-1 15-21 17 42 17-31 16 11h114" />
    </svg>
  )
}

function Robot() {
  return (
    <div className="exp002-robot" role="img" aria-label="Robot adorable con una medalla dorada">
      <span className="robot-heart robot-heart-one">♥</span>
      <span className="robot-heart robot-heart-two">♡</span>
      <span className="robot-heart robot-heart-three">♥</span>
      <span className="robot-arm robot-arm-left" />
      <span className="robot-arm robot-arm-right" />
      <div className="robot-head">
        <span className="robot-antenna" />
        <span className="robot-eye robot-eye-left" />
        <span className="robot-eye robot-eye-right" />
        <span className="robot-smile" />
      </div>
      <div className="robot-body">
        <span className="robot-heart-core">♡</span>
      </div>
      <div className="robot-medal"><span>EL MEJOR<br />ENFERMERO<br />DEL MUNDO ♡</span></div>
      <span className="robot-leg robot-leg-left" />
      <span className="robot-leg robot-leg-right" />
    </div>
  )
}

export default function Expediente002() {
  const stored = useMemo(loadProgress, [])
  const [progress, setProgress] = useState(stored.progress)
  const [storageWarning, setStorageWarning] = useState(stored.warning)
  const [typedCharacters, setTypedCharacters] = useState(0)
  const [celebrating, setCelebrating] = useState(false)
  const [confirmReset, setConfirmReset] = useState(false)
  const [randomHearts, setRandomHearts] = useState([])

  const question = expediente002Questions[progress.current]
  const answerByIndex = useMemo(
    () => new Map(progress.answers.map((answer) => [answer.questionIndex, answer])),
    [progress.answers],
  )
  const answered = answerByIndex.get(progress.current)
  const correctCount = progress.answers.filter((answer) => answer.correct).length
  const score = progress.answers.reduce((sum, answer) => sum + (answer.correct ? answer.points : 0), 0)
  const levelIndex = question.level
  const level = expediente002Levels[levelIndex]
  const progressPercent = Math.round((progress.answers.length / expediente002Questions.length) * 100)

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
      setStorageWarning('')
    } catch {
      setStorageWarning('El navegador no permitió guardar el progreso. Evitá cerrar o actualizar esta página.')
    }
  }, [progress])

  useEffect(() => {
    if (!progress.started || progress.completed || !progress.timerEnabled) return undefined
    const timer = window.setInterval(() => {
      setProgress((current) => ({ ...current, elapsedSeconds: current.elapsedSeconds + 1 }))
    }, 1000)
    return () => window.clearInterval(timer)
  }, [progress.started, progress.completed, progress.timerEnabled])

  useEffect(() => {
    if (!progress.completed || progress.revealed) return undefined
    const timer = window.setTimeout(() => {
      setProgress((current) => ({ ...current, revealed: true }))
    }, 2300)
    return () => window.clearTimeout(timer)
  }, [progress.completed, progress.revealed])

  useEffect(() => {
    if (!progress.revealed) return undefined
    setTypedCharacters(0)
    const timer = window.setInterval(() => {
      setTypedCharacters((current) => {
        if (current >= MESSAGE_CHARACTERS.length) {
          window.clearInterval(timer)
          return MESSAGE_CHARACTERS.length
        }
        return current + 1
      })
    }, 43)
    return () => window.clearInterval(timer)
  }, [progress.revealed])

  const chooseAnswer = (selected) => {
    if (answered) return
    const isCorrect = selected === question.correct
    setProgress((current) => ({
      ...current,
      answers: [
        ...current.answers,
        {
          questionIndex: current.current,
          selected,
          correct: isCorrect,
          points: isCorrect ? question.points : 0,
        },
      ],
    }))
  }

  const goNext = () => {
    if (!answered) return
    if (progress.current === expediente002Questions.length - 1) {
      if (progress.answers.length !== expediente002Questions.length) return
      setProgress((current) => ({ ...current, completed: true }))
      return
    }
    setProgress((current) => ({ ...current, current: current.current + 1 }))
  }

  const reset = () => {
    setProgress(freshProgress())
    setTypedCharacters(0)
    setCelebrating(false)
    setRandomHearts([])
    setConfirmReset(false)
    try {
      window.localStorage.removeItem(STORAGE_KEY)
      setStorageWarning('')
    } catch {
      setStorageWarning('No se pudo borrar el progreso guardado. Podés volver a intentarlo desde el navegador.')
    }
  }

  const receiveMedal = () => {
    setProgress((current) => ({ ...current, medalReceived: true }))
    setCelebrating(true)
    setRandomHearts(Array.from({ length: 28 }, (_, index) => ({
      id: `${Date.now()}-${index}`,
      left: `${(index * 37 + 11) % 100}%`,
      delay: `${(index % 9) * 0.13}s`,
      size: `${14 + (index % 4) * 5}px`,
    })))
    window.setTimeout(() => setCelebrating(false), 5000)
  }

  return (
    <section className="exp002-shell" id="expediente-002" aria-label="Expediente 002: The Nurse Challenge">
      <div className="exp002-paper">
        <header className="exp002-topbar">
          <div className="exp002-brand">
            <span className="exp002-brand-cross" aria-hidden="true">✚</span>
            <span><b>UNIDAD DE EVALUACIÓN CLÍNICA</b><small>SIMULADOR PROFESIONAL · ACCESO RESTRINGIDO</small></span>
          </div>
          <div className="exp002-top-actions">
            <span className="exp002-file-count">EXPEDIENTE <b>002 / 002</b></span>
            {(progress.started || progress.completed) && (
              <button type="button" className="exp002-reset-link" onClick={() => setConfirmReset(true)}>REINICIAR</button>
            )}
          </div>
        </header>

        <div className="exp002-content">
          {storageWarning && <p className="exp002-storage-warning" role="status">{storageWarning}</p>}

          {!progress.started && !progress.completed && (
            <div className="exp002-welcome">
              <div className="exp002-welcome-copy">
                <div className="exp002-kicker"><span className="exp002-status-dot" /> CONTINUACIÓN DEL ARCHIVO · CONFIDENCIAL</div>
                <h2>Bienvenido nuevamente,<br /><span>enfermero Lucio.</span></h2>
                <p className="exp002-lead">El Expediente 002 ha sido clasificado como <strong>CONFIDENCIAL</strong>. Para acceder a su contenido deberá superar una evaluación extraordinaria de conocimientos de enfermería.</p>
                <div className="exp002-warning"><span aria-hidden="true">!</span><p><b>ADVERTENCIA DE EVALUACIÓN</b><br />No se permiten consultas externas. No se permite abandonar la evaluación. Su reputación profesional está en juego.</p></div>
                <label className="exp002-timer-toggle"><input type="checkbox" checked={progress.timerEnabled} onChange={(event) => setProgress((current) => ({ ...current, timerEnabled: event.target.checked }))} /><span>Activar cronómetro de registro (opcional, sin límite de tiempo)</span></label>
                <button type="button" className="exp002-primary-button" onClick={() => setProgress((current) => ({ ...current, started: true }))}>INICIAR EVALUACIÓN <span aria-hidden="true">→</span></button>
                <p className="exp002-disclaimer">Evaluación simulada con fines educativos. No reemplaza protocolos institucionales, criterio clínico ni supervisión profesional.</p>
              </div>

              <aside className="exp002-credential" aria-label="Credencial profesional digital">
                <div className="exp002-credential-head"><span>IDENTIFICACIÓN PROFESIONAL</span><span className="exp002-credential-signal">● ACTIVA</span></div>
                <div className="exp002-id-photo"><span>✚</span><i>♥</i></div>
                <strong className="exp002-id-name">LUCIO</strong>
                <span className="exp002-id-role">ENFERMERO · EVALUACIÓN ESPECIAL</span>
                <div className="exp002-id-code"><span>ACCESO</span><b>002-LC-♡-2026</b></div>
                <div className="exp002-id-seal">CONFIDENCIAL</div>
              </aside>

              <div className="exp002-monitor-card">
                <div><span className="exp002-small-label">CENTRO DE MONITOREO</span><b>SEÑAL ESTABLE · EVALUACIÓN PENDIENTE</b></div>
                <MonitorLine />
                <span className="exp002-monitor-rate">♥ 72 <small>BPM</small></span>
              </div>

              <div className="exp002-level-preview">
                {expediente002Levels.map((item, index) => (
                  <div key={item.title}><span>NIVEL 0{index + 1}</span><b>{item.title}</b><small>{index === 0 ? 'FUNDAMENTOS' : index === 1 ? 'AVANZADO' : index === 2 ? 'CUIDADOS CRÍTICOS' : 'LIDERAZGO'}</small></div>
                ))}
              </div>
            </div>
          )}

          {progress.started && !progress.completed && (
            <div className="exp002-exam">
              <div className="exp002-exam-heading">
                <div><div className="exp002-kicker"><span className="exp002-status-dot" /> EVALUACIÓN EN CURSO · CASO CLÍNICO SIMULADO</div><h2>{level.title}</h2><p>{level.subtitle}</p></div>
                <div className="exp002-live-stats"><span>ACUMULADO <b>{score} pts</b></span><span>ACIERTOS <b>{correctCount}/{progress.answers.length}</b></span>{progress.timerEnabled && <span>TIEMPO <b>{formatTime(progress.elapsedSeconds)}</b></span>}</div>
              </div>

              <div className="exp002-progress-row"><span>PROGRESO DEL EXPEDIENTE</span><b>{progress.answers.length} / {expediente002Questions.length}</b></div>
              <div className="exp002-progress-track" role="progressbar" aria-label="Progreso del examen" aria-valuenow={progress.answers.length} aria-valuemin="0" aria-valuemax={expediente002Questions.length}><span style={{ width: `${progressPercent}%` }} /></div>
              <div className="exp002-level-track" aria-label={`Nivel ${levelIndex + 1} de 4`}>{expediente002Levels.map((item, index) => <span key={item.title} className={index === levelIndex ? 'is-current' : index < levelIndex ? 'is-done' : ''}>{String(index + 1).padStart(2, '0')} · {item.title}</span>)}</div>

              <article className="exp002-question-card">
                <div className="exp002-question-meta"><span>{question.category}</span><span>CASO {String(progress.current + 1).padStart(2, '0')} / {expediente002Questions.length}</span><b>{question.points} PTS</b></div>
                <p className="exp002-scenario">{question.scenario}</p>
                <div className="exp002-options" role="group" aria-label="Seleccioná una respuesta">
                  {question.options.map((option, index) => {
                    let stateClass = ''
                    if (answered && index === question.correct) stateClass = 'is-correct'
                    else if (answered && index === answered.selected) stateClass = 'is-incorrect'
                    return (
                      <button type="button" key={option} disabled={Boolean(answered)} className={stateClass} onClick={() => chooseAnswer(index)}>
                        <span className="exp002-option-letter">{String.fromCharCode(65 + index)}</span><span>{option}</span>
                        {answered && index === question.correct && <b className="exp002-option-mark">✓</b>}
                        {answered && index === answered.selected && !answered.correct && <b className="exp002-option-mark">×</b>}
                      </button>
                    )
                  })}
                </div>
                {question.safety && <p className="exp002-safety-note"><b>SIMULACIÓN EDUCATIVA:</b> {question.safety}</p>}
                {answered && <div className={`exp002-feedback ${answered.correct ? 'is-correct' : 'is-incorrect'}`} role="status"><b>{answered.correct ? `RESPUESTA CORRECTA · +${question.points} PUNTOS` : 'RESPUESTA INCORRECTA · 0 PUNTOS'}</b><p>{question.explanation}</p></div>}
              </article>

              <div className="exp002-exam-controls">
                <button type="button" className="exp002-secondary-button" disabled={progress.current === 0} onClick={() => setProgress((current) => ({ ...current, current: current.current - 1 }))}>← ANTERIOR</button>
                <span>RESPUESTAS REGISTRADAS: {progress.answers.length} / {expediente002Questions.length}</span>
                <button type="button" className="exp002-primary-button" disabled={!answered} onClick={goNext}>{progress.current === expediente002Questions.length - 1 ? 'FINALIZAR EVALUACIÓN' : 'SIGUIENTE CASO'} <span aria-hidden="true">→</span></button>
              </div>

              <details className="exp002-answer-log">
                <summary>REGISTRO DE RESPUESTAS ({progress.answers.length})</summary>
                <ol>{progress.answers.map((answer) => {
                  const item = expediente002Questions[answer.questionIndex]
                  return <li key={answer.questionIndex} className={answer.correct ? 'is-correct' : 'is-incorrect'}><span>CASO {String(answer.questionIndex + 1).padStart(2, '0')} · {item.category}</span><b>{answer.correct ? 'CORRECTA' : 'REVISAR'}</b></li>
                })}</ol>
              </details>
              <p className="exp002-disclaimer">Escenario ficticio para aprendizaje. Todo cálculo es ilustrativo; cualquier práctica real requiere prescripción validada, alergias, función renal, concentración, límites de dosis y controles institucionales.</p>
            </div>
          )}

          {progress.completed && !progress.revealed && (
            <div className="exp002-processing" role="status" aria-live="polite">
              <div className="exp002-processing-ring"><span>♡</span></div>
              <p>Evaluación finalizada. Procesando resultados...</p>
              <span>CONSOLIDANDO REGISTRO CLÍNICO · {formatTime(progress.elapsedSeconds)}</span>
            </div>
          )}

          {progress.revealed && (
            <div className="exp002-finale">
              <div className="exp002-finale-kicker"><span className="exp002-status-dot" /> EVALUACIÓN CERRADA · RECONOCIMIENTO PERSONAL</div>
              <div className="exp002-score-seal"><span>RESULTADO ACADÉMICO</span><b>{score} PTS</b><small>{correctCount} / {expediente002Questions.length} RESPUESTAS CORRECTAS</small></div>
              <h2>Hay algo que ningún examen puede evaluar.</h2>
              <Robot />
              <div className="exp002-robot-speech" aria-live="polite"><span>{MESSAGE_CHARACTERS.slice(0, typedCharacters).join('')}</span>{typedCharacters < MESSAGE_CHARACTERS.length && <i aria-hidden="true" />}</div>
              <p className="exp002-romantic-copy">Porque hay cosas que ningún examen puede medir. Y una de ellas es lo especial que podés llegar a ser para alguien.</p>
              <div className="exp002-closure">Expediente 002: <b>CERRADO.</b><br />Reconocimiento otorgado: <b>ENFERMERO FAVORITO.</b><br />Motivo: ser irreemplazable. ♡</div>
              <button type="button" className={`exp002-medal-button ${progress.medalReceived ? 'has-received' : ''}`} onClick={receiveMedal}>{progress.medalReceived ? '¡MEDALLA RECIBIDA! 🏅' : 'RECIBIR MI MEDALLA 🏅'}</button>
              {celebrating && <div className="exp002-heart-rain" aria-hidden="true">{randomHearts.map((heart) => <span key={heart.id} style={{ left: heart.left, animationDelay: heart.delay, fontSize: heart.size }}>♥</span>)}</div>}
              {progress.medalReceived && <p className="exp002-celebration-message" role="status">RECONOCIMIENTO OTORGADO · ENFERMERO FAVORITO ♡</p>}
              <button type="button" className="exp002-reset-final" onClick={() => setConfirmReset(true)}>VOLVER A EMPEZAR EVALUACIÓN</button>
            </div>
          )}
        </div>

        <footer className="exp002-footer"><span>EXPEDIENTE 002 · THE NURSE CHALLENGE ♡</span><span>SIMULACIÓN EDUCATIVA · REGISTRO LOCAL</span></footer>
      </div>

      {confirmReset && (
        <div className="exp002-dialog-backdrop">
          <div className="exp002-dialog" role="alertdialog" aria-modal="true" aria-labelledby="exp002-reset-title">
            <h2 id="exp002-reset-title">¿Reiniciar la evaluación?</h2>
            <p>Se borrará el progreso guardado de este expediente y se comenzará desde el inicio.</p>
            <div><button type="button" className="exp002-secondary-button" onClick={() => setConfirmReset(false)}>CANCELAR</button><button type="button" className="exp002-primary-button" onClick={reset}>CONFIRMAR REINICIO</button></div>
          </div>
        </div>
      )}
    </section>
  )
}
