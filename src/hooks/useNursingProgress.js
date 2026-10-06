import { useCallback, useMemo, useState } from 'react'

export const NURSING_STORAGE_KEY = 'expediente001_nursing_progress'

const INITIAL_PROGRESS = {
  points: 0,
  correct: 0,
  incorrect: 0,
  currentStreak: 0,
  maxStreak: 0,
  passedLevels: [],
  examsPassed: 0,
  bestExam: 0,
}

function sanitizeProgress(value) {
  return {
    points: Math.max(0, Number(value?.points) || 0),
    correct: Math.max(0, Number(value?.correct) || 0),
    incorrect: Math.max(0, Number(value?.incorrect) || 0),
    currentStreak: Math.max(0, Number(value?.currentStreak) || 0),
    maxStreak: Math.max(0, Number(value?.maxStreak) || 0),
    passedLevels: Array.isArray(value?.passedLevels)
      ? value.passedLevels.filter((level) => ['practice', 'guardia', 'critical'].includes(level))
      : [],
    examsPassed: Math.max(0, Number(value?.examsPassed) || 0),
    bestExam: Math.min(10, Math.max(0, Number(value?.bestExam) || 0)),
  }
}

function readProgress() {
  if (typeof window === 'undefined') return INITIAL_PROGRESS
  try {
    return sanitizeProgress(JSON.parse(window.localStorage.getItem(NURSING_STORAGE_KEY)))
  } catch {
    return INITIAL_PROGRESS
  }
}

function writeProgress(progress) {
  try {
    window.localStorage.setItem(
      NURSING_STORAGE_KEY,
      JSON.stringify({ ...progress, rank: getRank(progress) }),
    )
  } catch {
    // El módulo puede continuar sin persistencia si el navegador la bloquea.
  }
}

function getRank(progress) {
  if (progress.examsPassed > 0 && progress.passedLevels.includes('critical')) return 'JEFE/A DE GUARDIA'
  if (progress.passedLevels.includes('guardia') || progress.points >= 3000) return 'ENFERMERO/A DE GUARDIA'
  if (progress.passedLevels.includes('practice') || progress.points >= 1500) return 'ENFERMERO/A'
  if (progress.points >= 500) return 'PRACTICANTE'
  return 'ESTUDIANTE'
}

export default function useNursingProgress() {
  const [progress, setProgress] = useState(readProgress)

  const update = useCallback((updater) => {
    setProgress((current) => {
      const next = sanitizeProgress(updater(current))
      writeProgress(next)
      return next
    })
  }, [])

  const recordAnswer = useCallback((isCorrect, points = 0) => {
    update((current) => {
      const nextStreak = isCorrect ? current.currentStreak + 1 : 0
      return {
        ...current,
        points: current.points + (isCorrect ? points : 0),
        correct: current.correct + (isCorrect ? 1 : 0),
        incorrect: current.incorrect + (isCorrect ? 0 : 1),
        currentStreak: nextStreak,
        maxStreak: Math.max(current.maxStreak, nextStreak),
      }
    })
  }, [update])

  const completeLevel = useCallback((level) => {
    update((current) => ({
      ...current,
      passedLevels: current.passedLevels.includes(level)
        ? current.passedLevels
        : [...current.passedLevels, level],
    }))
  }, [update])

  const completeExam = useCallback((score) => {
    update((current) => ({
      ...current,
      examsPassed: current.examsPassed + (score >= 8 ? 1 : 0),
      bestExam: Math.max(current.bestExam, score),
    }))
  }, [update])

  const resetProgress = useCallback(() => {
    setProgress(INITIAL_PROGRESS)
    try {
      window.localStorage.removeItem(NURSING_STORAGE_KEY)
    } catch {
      // Sin acción adicional si el almacenamiento no está disponible.
    }
  }, [])

  const rank = useMemo(() => getRank(progress), [progress])

  return { progress, rank, recordAnswer, completeLevel, completeExam, resetProgress }
}
