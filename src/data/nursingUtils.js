export function shuffle(items) {
  const copy = [...items]
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1))
    ;[copy[index], copy[randomIndex]] = [copy[randomIndex], copy[index]]
  }
  return copy
}

export function shuffleAnswers(question) {
  const shuffled = shuffle(question.options.map((option, originalIndex) => ({ option, originalIndex })))
  return {
    ...question,
    options: shuffled.map((entry) => entry.option),
    correct: shuffled.findIndex((entry) => entry.originalIndex === question.correct),
  }
}

export function selectQuestions(questions, count, excludedIds = []) {
  const excluded = new Set(excludedIds)
  const preferred = questions.filter((question) => !excluded.has(question.id))
  const pool = preferred.length >= count ? preferred : questions
  return shuffle(pool).slice(0, count).map(shuffleAnswers)
}

export function selectMixedQuestions(questions, count, excludedIds = []) {
  const excluded = new Set(excludedIds)
  const filtered = questions.filter((question) => !excluded.has(question.id))
  const pool = filtered.length >= count ? filtered : questions
  const categories = shuffle([...new Set(pool.map((question) => question.category))])
  const selected = []

  categories.slice(0, count).forEach((category) => {
    const candidate = shuffle(pool.filter((question) => question.category === category))[0]
    if (candidate) selected.push(candidate)
  })

  const selectedIds = new Set(selected.map((question) => question.id))
  const remaining = shuffle(pool.filter((question) => !selectedIds.has(question.id)))
  selected.push(...remaining.slice(0, Math.max(0, count - selected.length)))
  return shuffle(selected).slice(0, count).map(shuffleAnswers)
}
