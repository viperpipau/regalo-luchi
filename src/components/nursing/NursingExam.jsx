import { useMemo, useRef, useState } from 'react'
import { nursingQuestions } from '../../data/nursingQuestions'
import { selectMixedQuestions } from '../../data/nursingUtils'
import NursingQuestion from './NursingQuestion'

const EXAM_SIZE = 10

export default function NursingExam({ onRecordAnswer, onCompleteExam, onExit }) {
  const lastQuestionIds = useRef([])
  const createExam = () => {
    const preferred = nursingQuestions.filter((question) => question.difficulty !== 'practice')
    const selected = selectMixedQuestions(preferred, EXAM_SIZE, lastQuestionIds.current)
    lastQuestionIds.current = selected.map((question) => question.id)
    return selected
  }
  const [questions, setQuestions] = useState(createExam)
  const [index, setIndex] = useState(0)
  const [answered, setAnswered] = useState(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)
  const question = questions[index]

  const answer = (optionIndex) => {
    if (answered) return
    const correct = optionIndex === question.correct
    setAnswered({ correct })
    if (correct) setScore((value) => value + 1)
    onRecordAnswer(correct, question.points)
  }

  const next = () => {
    if (index === EXAM_SIZE - 1) {
      const finalScore = score
      onCompleteExam(finalScore)
      setFinished(true)
      return
    }
    setIndex((value) => value + 1)
    setAnswered(null)
  }

  const repeat = () => {
    setQuestions(createExam())
    setIndex(0)
    setAnswered(null)
    setScore(0)
    setFinished(false)
  }

  const perfectMessage = useMemo(() => score === EXAM_SIZE, [score])

  if (finished) {
    const passed = score >= 8
    return (
      <div className="evaluation-result">
        <div className="module-kicker">EXAMEN DE GUARDIA · RESULTADO</div>
        <h3>{passed ? 'EVALUACIÓN APROBADA' : 'EVALUACIÓN NO APROBADA'}</h3>
        <p>RESULTADO: {score} / {EXAM_SIZE}</p>
        <strong>{passed ? 'PERSONAL AUTORIZADO' : 'REQUIERE NUEVA EVALUACIÓN'}</strong>
        {perfectMessage && <p>Diagnóstico: claramente sabe demasiado.</p>}
        {passed && <p className="romantic-unlock">ACCESO ESPECIAL AUTORIZADO · Si llegaste hasta acá, queda asentado que además de cuidarme, sabés muchísimo.</p>}
        <div className="result-actions">
          <button type="button" className="module-button" onClick={repeat}>REPETIR EXAMEN</button>
          <button type="button" className="secondary-medical-button" onClick={onExit}>VOLVER AL PANEL</button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="evaluation-header">
        <span>EXAMEN DE GUARDIA</span>
        <b>PREGUNTA {index + 1} / {EXAM_SIZE}</b>
      </div>
      <NursingQuestion question={question} answered={answered} onAnswer={answer} label={`${question.category} · EVALUACIÓN`} />
      {answered && <button type="button" className="module-button next-question" onClick={next}>{index === EXAM_SIZE - 1 ? 'FINALIZAR EVALUACIÓN' : 'SIGUIENTE PREGUNTA'}</button>}
    </div>
  )
}
