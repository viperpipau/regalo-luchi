import { useCallback, useState } from 'react'

const STORAGE_KEY = 'expediente001_progress'
const INITIAL_PROGRESS = {
  casoClinico: false,
  ordenesMedicas: false,
  interconsulta: false,
}

function readProgress() {
  if (typeof window === 'undefined') return INITIAL_PROGRESS

  try {
    const stored = JSON.parse(window.localStorage.getItem(STORAGE_KEY))
    return Object.fromEntries(
      Object.keys(INITIAL_PROGRESS).map((key) => [key, stored?.[key] === true]),
    )
  } catch {
    return INITIAL_PROGRESS
  }
}

export default function useExpedienteProgress() {
  const [progress, setProgress] = useState(readProgress)

  const completeProcedure = useCallback((procedure) => {
    if (!(procedure in INITIAL_PROGRESS)) return

    setProgress((current) => {
      if (current[procedure]) return current

      const next = { ...current, [procedure]: true }
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      } catch {
        // La experiencia sigue funcionando aunque el navegador bloquee localStorage.
      }
      return next
    })
  }, [])

  return { progress, completeProcedure }
}
