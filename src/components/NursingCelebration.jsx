import { useEffect, useRef, useState } from 'react'
import './NursingCelebration.css'

const CONFETTI = ['♡', '✦', '✚', '💉', '🩺', '♥', '✿']
const HUG_EMOJIS = ['❤️', '🥰', '😊', '💗', '🤗', '💞', '🩷']
const LUCHI_SPRITE = '/fotos/file_00000000e0d8820e95237dca2b209143.png'

export default function NursingCelebration({ open, onClose }) {
  const [letterOpened, setLetterOpened] = useState(false)
  const [hugs, setHugs] = useState([])
  const closeTimerRef = useRef(null)

  useEffect(() => {
    if (!open) return undefined
    setLetterOpened(false)
    const timer = window.setTimeout(() => setLetterOpened(true), 320)
    return () => window.clearTimeout(timer)
  }, [open])

  useEffect(() => () => {
    if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current)
  }, [])

  if (!open) return null

  const playSoftTone = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext
      if (!AudioContext) return
      const context = new AudioContext()
      const notes = [523.25, 659.25, 783.99]
      notes.forEach((frequency, index) => {
        const oscillator = context.createOscillator()
        const gain = context.createGain()
        oscillator.type = 'sine'
        oscillator.frequency.value = frequency
        const start = context.currentTime + index * 0.12
        gain.gain.setValueAtTime(0.0001, start)
        gain.gain.exponentialRampToValueAtTime(0.055, start + 0.03)
        gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.55)
        oscillator.connect(gain)
        gain.connect(context.destination)
        oscillator.start(start)
        oscillator.stop(start + 0.58)
      })
      closeTimerRef.current = window.setTimeout(() => context.close(), 900)
    } catch {
      // El sonido es opcional: la carta sigue funcionando sin soporte de audio.
    }
  }

  const handleClose = () => {
    playSoftTone()
    onClose()
  }

  const sendHug = () => {
    const nextHugs = Array.from({ length: 28 }, (_, index) => ({
      id: `${Date.now()}-${index}`,
      emoji: HUG_EMOJIS[index % HUG_EMOJIS.length],
      left: 4 + Math.random() * 92,
      delay: Math.random() * 0.55,
      duration: 2.4 + Math.random() * 1.4,
      drift: -35 + Math.random() * 70,
      size: 18 + Math.random() * 18,
    }))
    setHugs(nextHugs)
    window.setTimeout(() => setHugs([]), 4200)
  }

  return (
    <div className="nursing-modal" role="dialog" aria-modal="true" aria-labelledby="nursing-modal-title">
      <button className="nursing-modal__backdrop" type="button" aria-label="Cerrar carta" onClick={handleClose} />

      <div className="nursing-confetti" aria-hidden="true">
        {Array.from({ length: 32 }, (_, index) => (
          <span
            key={index}
            style={{
              '--x': `${(index * 31) % 100}%`,
              '--delay': `${(index % 8) * 0.22}s`,
              '--duration': `${5 + (index % 5) * 0.7}s`,
            }}
          >
            {CONFETTI[index % CONFETTI.length]}
          </span>
        ))}
      </div>

      {hugs.map((hug) => (
        <span
          key={hug.id}
          className="virtual-hug"
          aria-hidden="true"
          style={{
            left: `${hug.left}%`,
            '--hug-delay': `${hug.delay}s`,
            '--hug-duration': `${hug.duration}s`,
            '--hug-drift': `${hug.drift}px`,
            '--hug-size': `${hug.size}px`,
          }}
        >
          {hug.emoji}
        </span>
      ))}

      <section className={`nursing-letter ${letterOpened ? 'nursing-letter--open' : ''}`}>
        <button className="nursing-letter__close" type="button" aria-label="Cerrar" onClick={handleClose}>×</button>
        <div className="nursing-letter__seal" aria-hidden="true">♡</div>
        <div className="nursing-letter__sprite-wrap" aria-label="Sprite de Luchi">
          <span
            className="nursing-letter__sprite"
            style={{ backgroundImage: `url("${LUCHI_SPRITE}")` }}
          />
        </div>
        <div className="nursing-letter__decoration" aria-hidden="true">🩺　💉　♥　✚　🩹</div>
        <h2 id="nursing-modal-title">Querido Luchi,</h2>
        <div className="nursing-letter__text">
          <p>
            En cada latido y cuidado entregado hay un mundo de valentía y amor.
            Tu labor es la luz en los momentos más difíciles, el abrazo cálido que
            calma el dolor, la esperanza que nunca se rinde.
          </p>
          <p>
            Hoy celebramos tu entrega incansable y honramos tu vocación que cura
            más allá de la ciencia. ¡Gracias por ser ese corazón gigante que sostiene vidas!
          </p>
        </div>
        <strong className="nursing-letter__closing">¡Feliz Día de la Enfermería! ♡</strong>
        <button className="nursing-hug-button" type="button" onClick={sendHug}>
          <span aria-hidden="true">🤗</span>
          Enviar un abrazo virtual
        </button>
      </section>
    </div>
  )
}
