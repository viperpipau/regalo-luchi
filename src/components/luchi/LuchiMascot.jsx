import { useState } from 'react'
import LuchiSprite, { LUCHI_POSES } from './LuchiSprite'
import './LuchiMascot.css'

export default function LuchiMascot() {
  const [poseIndex, setPoseIndex] = useState(0)

  const showNextPose = () => {
    setPoseIndex((current) => (current + 1) % LUCHI_POSES.length)
  }

  return (
    <button
      type="button"
      className="luchi-mascot"
      onClick={showNextPose}
      aria-label="Cambiar ilustración de Luchi"
      title="Hacé clic para ver otro sticker de Luchi"
    >
      <LuchiSprite poseIndex={poseIndex} className="luchi-mascot__sprite" />
    </button>
  )
}
