import { useState } from 'react'

const QUESTIONS = [
  {
    question: '¿Cuál es el diagnóstico más probable?',
    options: ['A. Hipertensión', 'B. Fiebre', 'C. Lucio', 'D. Falta de café'],
    answer: 2,
  },
  {
    question: '¿Cuál sería el tratamiento indicado?',
    options: ['A. Reposo absoluto', 'B. Evitar al enfermero', 'C. Más abrazos', 'D. Suspender mensajes'],
    answer: 2,
  },
]

export default function ClinicalCase({ completed, onComplete }) {
  const [questionIndex, setQuestionIndex] = useState(completed ? 2 : 0)
  const [status, setStatus] = useState(completed ? 'complete' : '')

  const answerQuestion = (optionIndex) => {
    if (optionIndex !== QUESTIONS[questionIndex].answer) {
      setStatus('wrong')
      return
    }

    if (questionIndex === 0) {
      setStatus('diagnosed')
      return
    }

    setQuestionIndex(2)
    setStatus('complete')
    onComplete()
  }

  const continueCase = () => {
    setQuestionIndex(1)
    setStatus('')
  }

  return (
    <section className="module clinical-case" id="caso-clinico">
      <div className="module-kicker">CASO CLÍNICO Nº 001</div>
      {questionIndex === 0 && (
        <div className="clinical-content">
          <p><b>Paciente femenina presenta:</b></p>
          <ul className="clinical-symptoms">
            <li>FC elevada</li>
            <li>sonrisa persistente</li>
            <li>necesidad recurrente de revisar WhatsApp</li>
            <li>pensamiento constante en un enfermero</li>
            <li>mejoría inmediata al recibir mensajes</li>
          </ul>
        </div>
      )}
      {questionIndex < 2 && status !== 'diagnosed' && (
        <>
          <h2>{QUESTIONS[questionIndex].question}</h2>
          <div className="clinical-options">
            {QUESTIONS[questionIndex].options.map((option, index) => (
              <button type="button" key={option} onClick={() => answerQuestion(index)}>
                {option}
              </button>
            ))}
          </div>
        </>
      )}
      {status === 'wrong' && (
        <div className="case-status wrong-answer" role="alert">
          <strong>DIAGNÓSTICO INCORRECTO</strong>
          <span>Revise los signos clínicos e intente nuevamente.</span>
        </div>
      )}
      {status === 'diagnosed' && (
        <div className="case-status correct-answer" role="status">
          <strong>DIAGNÓSTICO CONFIRMADO</strong>
          <span>Agente etiológico identificado: Lucio.</span>
          <button className="module-button" type="button" onClick={continueCase}>CONTINUAR CASO</button>
        </div>
      )}
      {status === 'complete' && (
        <div className="case-status correct-answer" role="status">
          <strong>CASO RESUELTO</strong>
          <span>Tratamiento indicado: más abrazos.</span>
          <b>AUTORIZACIÓN DE ACCESO CONCEDIDA</b>
        </div>
      )}
    </section>
  )
}
