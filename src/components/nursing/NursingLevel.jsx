import { useMemo, useState } from 'react'
import { nursingQuestions, difficultyLabels } from '../../data/nursingQuestions'
import { selectQuestions } from '../../data/nursingUtils'
import NursingQuestion from './NursingQuestion'

const QUESTION_COUNT = 6

export default function NursingLevel({ difficulty, onRecordAnswer, onCompleteLevel, onExit }) {
  const questions = useMemo(
    () => selectQuestions(nursingQuestions.filter((question) => question.difficulty === difficulty), QUESTION_COUNT),
    [difficulty],
  )
  const [index, setIndex] = useState(0)
  const [answered, setAnswered] = useState(null)
  const [correctCount, setCorrectCount] = useState(0)
  const [attempts, setAttempts] = useState(3)
  const [finished, setFinished] = useState(false)

  const question = questions[index]

  const answer = (optionIndex) => {
    if (answered) return
    const correct = optionIndex === question.correct
    setAnswered({ correct })
    onRecordAnswer(correct, question.points)
    if (correct) setCorrectCount((value) => value + 1)
    else setAttempts((value) => Math.max(0, value - 1))
  }

  const next = () => {
    const nextCorrect = correctCount
    const noAttempts = attempts === 0
    if (index === questions.length - 1 || noAttempts) {
      const passed = nextCorrect >= 4
      if (passed) onCompleteLevel(difficulty)
      setFinished(true)
      return
    }
    setIndex((value) => value + 1)
    setAnswered(null)
  }

  if (finished) {
    const passed = correctCount >= 4
    return (
      <div className="evaluation-result">
        <div className="module-kicker">{difficultyLabels[difficulty]}</div>
        <h3>{passed ? 'NIVEL APROBADO' : 'EVALUACIÓN FINALIZADA'}</h3>
        <p>Respuestas correctas: {correctCount} / {questions.length}</p>
        <strong>{passed ? 'ARCHIVO ADICIONAL DESBLOQUEADO' : 'REQUIERE NUEVA EVALUACIÓN'}</strong>
        <button type="button" className="module-button" onClick={onExit}>VOLVER AL PANEL</button>
      </div>
    )
  }

  return (
    <div>
      <div className="evaluation-header">
        <span>{difficultyLabels[difficulty]}</span>
        <b>PREGUNTA {index + 1} / {questions.length}</b>
        <b>INTENTOS RESTANTES: {attempts}</b>
      </div>
      <NursingQuestion question={question} answered={answered} onAnswer={answer} />
      {answered && <button type="button" className="module-button next-question" onClick={next}>{attempts === 0 ? 'VER RESULTADO' : 'SIGUIENTE REGISTRO'}</button>}
    </div>
  )
}
