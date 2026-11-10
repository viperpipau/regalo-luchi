import { useCallback, useEffect, useRef, useState } from 'react'
import { gengarConfig } from './gengarConfig'
import './GengarMascot.css'

const randomBetween = (minimum, maximum) =>
  minimum + Math.random() * (maximum - minimum)

export default function GengarMascot() {
  const [ready, setReady] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [animation, setAnimation] = useState('APPEAR')
  const [animationCycle, setAnimationCycle] = useState(0)
  const [facing, setFacing] = useState(1)
  const spriteRef = useRef(null)
  const animationRef = useRef('APPEAR')
  const scheduleActivitiesRef = useRef(() => {})
  const positionRef = useRef(8)
  const facingRef = useRef(1)
  const timersRef = useRef([])

  const changeAnimation = useCallback((nextAnimation) => {
    animationRef.current = nextAnimation
    setAnimation(nextAnimation)
    setAnimationCycle((cycle) => cycle + 1)
  }, [])

  useEffect(() => {
    let active = true
    const spriteSheet = new Image()
    spriteSheet.onload = () => {
      if (!active) return

      const expectedWidth = gengarConfig.frameWidth * gengarConfig.columns
      const expectedHeight = gengarConfig.frameHeight * gengarConfig.rows
      if (spriteSheet.naturalWidth !== expectedWidth || spriteSheet.naturalHeight !== expectedHeight) {
        console.error(
          `Invalid Gengar sprite sheet dimensions: expected ${expectedWidth}x${expectedHeight}, received ${spriteSheet.naturalWidth}x${spriteSheet.naturalHeight}`,
        )
        return
      }

      setReady(true)
    }
    spriteSheet.onerror = () => {
      if (active) {
        console.error(`Unable to load Gengar sprite sheet: ${gengarConfig.spriteSheet}`)
      }
    }
    spriteSheet.src = gengarConfig.spriteSheet

    return () => {
      active = false
      spriteSheet.onload = null
      spriteSheet.onerror = null
    }
  }, [])

  useEffect(() => {
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const viewport = window.matchMedia(`(max-width: ${gengarConfig.displaySize.mobileBreakpoint}px)`)
    const updatePreferences = () => {
      setReducedMotion(motionPreference.matches)
      setIsMobile(viewport.matches)
    }

    updatePreferences()
    motionPreference.addEventListener('change', updatePreferences)
    viewport.addEventListener('change', updatePreferences)

    return () => {
      motionPreference.removeEventListener('change', updatePreferences)
      viewport.removeEventListener('change', updatePreferences)
    }
  }, [])

  useEffect(() => {
    if (!ready) return undefined

    if (reducedMotion) {
      changeAnimation('IDLE')
      return undefined
    }

    let animationFrame
    let previousTime = 0
    const timers = timersRef.current
    const clearTimers = () => {
      timers.forEach(window.clearTimeout)
      timers.length = 0
    }
    const schedule = (callback, delay) => {
      const timer = window.setTimeout(callback, delay)
      timers.push(timer)
      return timer
    }
    let activityTimer = null
    let disappearanceTimer = null
    const scheduleActivities = () => {
      if (activityTimer !== null) window.clearTimeout(activityTimer)
      activityTimer = schedule(() => {
        activityTimer = null
        if (animationRef.current !== 'WALK') return
        changeAnimation('IDLE')
        activityTimer = schedule(() => {
          activityTimer = null
          if (animationRef.current !== 'IDLE') return
          changeAnimation('WALK')
          scheduleActivities()
        }, randomBetween(900, 1700))
      }, randomBetween(6500, 11000))

      if (disappearanceTimer === null) {
        const startDisappearance = () => {
          if (!['WALK', 'IDLE'].includes(animationRef.current)) {
            disappearanceTimer = schedule(startDisappearance, 500)
            return
          }

          disappearanceTimer = null
          if (activityTimer !== null) {
            window.clearTimeout(activityTimer)
            activityTimer = null
          }
          changeAnimation('DISAPPEAR')
        }

        disappearanceTimer = schedule(startDisappearance, randomBetween(26000, 42000))
      }
    }
    scheduleActivitiesRef.current = scheduleActivities

    const step = (time) => {
      if (document.visibilityState === 'visible' && animationRef.current === 'WALK') {
        const elapsed = previousTime ? Math.min((time - previousTime) / 1000, 0.05) : 0
        const spriteWidth = spriteRef.current?.getBoundingClientRect().width ?? 0
        const maximumPosition = Math.max(0, window.innerWidth - spriteWidth)
        const nextPosition = positionRef.current + facingRef.current * gengarConfig.movementSpeed * elapsed

        if (nextPosition <= 0 || nextPosition >= maximumPosition) {
          positionRef.current = Math.min(maximumPosition, Math.max(0, nextPosition))
          if (spriteRef.current) spriteRef.current.style.left = `${positionRef.current}px`
          changeAnimation('TURN')
        } else {
          positionRef.current = nextPosition
          if (spriteRef.current) spriteRef.current.style.left = `${nextPosition}px`
        }
      }

      previousTime = time
      animationFrame = window.requestAnimationFrame(step)
    }

    const handleResize = () => {
      const spriteWidth = spriteRef.current?.getBoundingClientRect().width ?? 0
      positionRef.current = Math.min(positionRef.current, Math.max(0, window.innerWidth - spriteWidth))
      if (spriteRef.current) spriteRef.current.style.left = `${positionRef.current}px`
    }

    positionRef.current = Math.min(positionRef.current, Math.max(0, window.innerWidth - 1))
    if (spriteRef.current) spriteRef.current.style.left = `${positionRef.current}px`
    changeAnimation('APPEAR')
    animationFrame = window.requestAnimationFrame(step)
    window.addEventListener('resize', handleResize)

    return () => {
      window.cancelAnimationFrame(animationFrame)
      window.removeEventListener('resize', handleResize)
      clearTimers()
      scheduleActivitiesRef.current = () => {}
      timersRef.current = []
    }
  }, [changeAnimation, ready, reducedMotion])

  const handleAnimationEnd = (event) => {
    if (event.animationName !== 'gengar-sprite-frames') return

    if (animationRef.current === 'TURN') {
      facingRef.current *= -1
      setFacing(facingRef.current)
      changeAnimation('WALK')
      scheduleActivitiesRef.current()
      return
    }

    if (animationRef.current === 'DISAPPEAR') {
      const timer = window.setTimeout(() => changeAnimation('APPEAR'), 750)
      timersRef.current.push(timer)
      return
    }

    if (animationRef.current === 'APPEAR') {
      changeAnimation('WALK')
      scheduleActivitiesRef.current()
    }
  }

  const handleClick = () => {
    if (!reducedMotion && ['WALK', 'IDLE'].includes(animationRef.current)) {
      changeAnimation('TURN')
    }
  }

  if (!ready) return null

  const animationConfig = gengarConfig.animations[animation]
  const displaySize = isMobile
    ? gengarConfig.displaySize.mobile
    : gengarConfig.displaySize.desktop
  const scale = displaySize / gengarConfig.frameWidth
  const frameWidth = gengarConfig.frameWidth * scale
  const frameHeight = gengarConfig.frameHeight * scale
  const style = {
    width: `${displaySize}px`,
    height: `${displaySize}px`,
    left: `${positionRef.current}px`,
    '--sheet-width': `${gengarConfig.frameWidth * gengarConfig.columns * scale}px`,
    '--sheet-height': `${gengarConfig.frameHeight * gengarConfig.rows * scale}px`,
    '--frame-width': `${frameWidth}px`,
    '--frame-height': `${frameHeight}px`,
    '--frame-count': animationConfig.frames,
    '--last-frame-offset': `${-animationConfig.frames * frameWidth}px`,
    '--frame-row-offset': `${-animationConfig.row * frameHeight}px`,
    '--facing': facing,
    '--frame-animation': reducedMotion || animationConfig.frames < 2
      ? 'none'
      : `gengar-sprite-frames ${animationConfig.frames / animationConfig.fps}s steps(${animationConfig.frames}, end) ${animationConfig.loop ? 'infinite' : '1 both'}`,
  }

  return (
    <button
      ref={spriteRef}
      type="button"
      className={`gengar-mascot gengar-mascot--${animation}`}
      style={style}
      aria-label="Gengar, mascota interactiva"
      title="¡Hacé clic para saludar!"
      onClick={handleClick}
    >
      <span
        key={`${animation}-${animationCycle}`}
        className="gengar-mascot__sprite"
        onAnimationEnd={handleAnimationEnd}
        style={{ backgroundImage: `url("${gengarConfig.spriteSheet}")` }}
      />
    </button>
  )
}
