export default function NursingQuestion({ question, answered, onAnswer, label }) {
  return (
    <div className="nursing-question">
      <div className="question-meta">
        <span>{label || question.category}</span>
        <b>{question.points} PTS</b>
      </div>
      <h3>{question.question}</h3>
      <div className="nursing-options">
        {question.options.map((option, index) => (
          <button
            type="button"
            key={`${question.id}-${option}`}
            onClick={() => onAnswer(index)}
            disabled={Boolean(answered)}
            className={answered && index === question.correct ? 'correct-option' : ''}
          >
            {option}
          </button>
        ))}
      </div>
      {answered && (
        <div className={answered.correct ? 'answer-feedback is-correct' : 'answer-feedback is-wrong'} role="status">
          <strong>{answered.correct ? 'RESPUESTA CORRECTA' : 'RESPUESTA INCORRECTA'}</strong>
          <p>{question.explanation}</p>
        </div>
      )}
    </div>
  )
}
