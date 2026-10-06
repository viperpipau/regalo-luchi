import { useState } from 'react'
import { chainedCases } from '../../data/nursingCases'

export default function NursingCases({ onRecordAnswer, onExit }) {
  const [caseIndex, setCaseIndex] = useState(0)
  const [stageIndex, setStageIndex] = useState(0)
  const [feedback, setFeedback] = useState(null)
  const [completed, setCompleted] = useState(false)
  const currentCase = chainedCases[caseIndex]
  const stage = currentCase.stages[stageIndex]

  const answer = (optionIndex) => {
    if (feedback) return
    const correct = optionIndex === stage.correct
    setFeedback({ correct })
    onRecordAnswer(correct, 100)
  }

  const next = () => {
    if (!feedback?.correct) {
      setFeedback(null)
      return
    }
    if (stageIndex < currentCase.stages.length - 1) {
      setStageIndex((value) => value + 1)
      setFeedback(null)
      return
    }
    if (caseIndex < chainedCases.length - 1) {
      setCaseIndex((value) => value + 1)
      setStageIndex(0)
      setFeedback(null)
      return
    }
    setCompleted(true)
  }

  if (completed) {
    return (
      <div className="evaluation-result">
        <div className="module-kicker">CASOS ENCADENADOS</div>
        <h3>CASOS CLÍNICOS RESUELTOS</h3>
        <p>Se completaron todas las etapas respetando la prioridad ABCDE.</p>
        <strong>REGISTRO DE RAZONAMIENTO VALIDADO</strong>
        <button type="button" className="module-button" onClick={onExit}>VOLVER AL PANEL</button>
      </div>
    )
  }

  return (
    <div className="chained-case">
      <div className="evaluation-header">
        <span>{currentCase.title}</span>
        <b>ETAPA {stageIndex + 1} / {currentCase.stages.length}</b>
      </div>
      <p className="case-description">{currentCase.description}</p>
      <h3>{stage.question}</h3>
      <div className="nursing-options">
        {stage.options.map((option, index) => (
          <button type="button" key={option} onClick={() => answer(index)} disabled={Boolean(feedback)} className={feedback && index === stage.correct ? 'correct-option' : ''}>{option}</button>
        ))}
      </div>
      {feedback && (
        <div className={feedback.correct ? 'answer-feedback is-correct' : 'answer-feedback is-wrong'} role="status">
          <strong>{feedback.correct ? 'RESPUESTA CORRECTA' : 'RESPUESTA INCORRECTA'}</strong>
          <p>{stage.explanation}</p>
        </div>
      )}
      {feedback && <button type="button" className="module-button next-question" onClick={next}>{feedback.correct ? 'DESBLOQUEAR SIGUIENTE ETAPA' : 'INTENTAR NUEVAMENTE'}</button>}
    </div>
  )
}
