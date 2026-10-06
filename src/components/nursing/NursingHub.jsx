import { useState } from 'react'
import useNursingProgress from '../../hooks/useNursingProgress'
import NursingCases from './NursingCases'
import NursingExam from './NursingExam'
import NursingLevel from './NursingLevel'
import NursingMiniGames from './NursingMiniGames'
import NursingRank from './NursingRank'
import './Nursing.css'

const levels = [
  { id: 'practice', title: 'NIVEL I · PRÁCTICA', detail: 'Fundamentos aplicados y cálculos clínicos.' },
  { id: 'guardia', title: 'NIVEL II · GUARDIA', detail: 'Priorización, seguridad y respuesta clínica.' },
  { id: 'critical', title: 'NIVEL III · TURNO CRÍTICO', detail: 'Casos complejos con razonamiento avanzado.' },
]

export default function NursingHub() {
  const nursing = useNursingProgress()
  const [mode, setMode] = useState('dashboard')
  const [resetPending, setResetPending] = useState(false)
  const passed = nursing.progress.passedLevels

  const isLevelUnlocked = (level) => {
    if (level === 'practice') return true
    if (level === 'guardia') return passed.includes('practice')
    return passed.includes('guardia')
  }

  return (
    <section className="module nursing-hub" id="enfermeria-avanzada">
      <div className="module-kicker">CENTRO DE EVALUACIÓN · ENFERMERÍA</div>
      <h2>Banco de prácticas de guardia</h2>
      <p className="nursing-disclaimer">Juego educativo. No reemplaza protocolos institucionales, supervisión clínica ni formación profesional.</p>
      <NursingRank progress={nursing.progress} rank={nursing.rank} />

      {nursing.progress.currentStreak >= 5 && (
        <p className="streak-note" role="status">OBSERVACIÓN: {nursing.progress.currentStreak >= 10 ? 'se solicita ascenso inmediato.' : 'rendimiento sospechosamente bueno.'}</p>
      )}

      {mode === 'dashboard' && (
        <div className="nursing-dashboard">
          <div className="level-grid">
            {levels.map((level) => {
              const unlocked = isLevelUnlocked(level.id)
              const completed = passed.includes(level.id)
              return (
                <button type="button" key={level.id} disabled={!unlocked} onClick={() => setMode(level.id)} className={completed ? 'level-card completed' : 'level-card'}>
                  <span>{level.title}</span>
                  <p>{level.detail}</p>
                  <strong>{completed ? 'APROBADO' : unlocked ? 'INICIAR EVALUACIÓN' : 'ACCESO RESTRINGIDO'}</strong>
                </button>
              )
            })}
          </div>
          <div className="nursing-actions">
            <button type="button" className="module-button" onClick={() => setMode('minigames')}>ABRIR MINIJUEGOS</button>
            <button type="button" className="module-button" onClick={() => setMode('cases')}>CASOS ENCADENADOS</button>
            <button type="button" className="module-button" onClick={() => setMode('exam')}>EXAMEN DE GUARDIA</button>
          </div>

          {(passed.length > 0 || nursing.progress.examsPassed > 0) && (
            <div className="romantic-files">
              <div className="module-kicker">DESBLOQUEOS DEL EXPEDIENTE</div>
              {passed.includes('practice') && <p><b>NIVEL I:</b> Archivo adicional desbloqueado. Nota: tu forma de cuidar también se estudia.</p>}
              {passed.includes('guardia') && <p><b>NIVEL II:</b> Evolución favorable cada vez que estás cerca.</p>}
              {passed.includes('critical') && <p><b>NIVEL III:</b> Mensaje personal: no existe protocolo para explicar cuánto bien me hacés.</p>}
              {nursing.progress.examsPassed > 0 && <p><b>ACCESO ESPECIAL:</b> Personal autorizado para administrar abrazos sin límite de horario.</p>}
            </div>
          )}

          <div className="reset-nursing">
            {!resetPending ? (
              <button type="button" className="text-medical-button" onClick={() => setResetPending(true)}>REINICIAR PROGRESO DE ENFERMERÍA</button>
            ) : (
              <div role="alert">
                <span>Esta acción borra únicamente puntos, rangos y evaluaciones de enfermería.</span>
                <button type="button" onClick={() => { nursing.resetProgress(); setResetPending(false) }}>CONFIRMAR REINICIO</button>
                <button type="button" onClick={() => setResetPending(false)}>CANCELAR</button>
              </div>
            )}
          </div>
        </div>
      )}

      {levels.some((level) => level.id === mode) && (
        <NursingLevel difficulty={mode} onRecordAnswer={nursing.recordAnswer} onCompleteLevel={nursing.completeLevel} onExit={() => setMode('dashboard')} />
      )}
      {mode === 'exam' && <NursingExam onRecordAnswer={nursing.recordAnswer} onCompleteExam={nursing.completeExam} onExit={() => setMode('dashboard')} />}
      {mode === 'cases' && <NursingCases onRecordAnswer={nursing.recordAnswer} onExit={() => setMode('dashboard')} />}
      {mode === 'minigames' && <NursingMiniGames onRecordAnswer={nursing.recordAnswer} onExit={() => setMode('dashboard')} />}
    </section>
  )
}
