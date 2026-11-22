import spriteSheet from '../../assets/luchi/luchi-sprites.png'

const SPRITE_SHEET = spriteSheet

export const LUCHI_POSES = [
  { x: 0, y: 0, width: 350, height: 945 },
  { x: 350, y: 0, width: 255, height: 355 },
  { x: 600, y: 0, width: 220, height: 355 },
  { x: 820, y: 0, width: 220, height: 355 },
  { x: 1035, y: 35, width: 195, height: 320 },
  { x: 300, y: 350, width: 300, height: 305 },
  { x: 595, y: 350, width: 225, height: 305 },
  { x: 820, y: 350, width: 220, height: 305 },
  { x: 1035, y: 350, width: 195, height: 305 },
  { x: 300, y: 645, width: 295, height: 310 },
  { x: 590, y: 645, width: 240, height: 310 },
  { x: 825, y: 645, width: 225, height: 310 },
  { x: 1045, y: 645, width: 185, height: 310 },
  { x: 35, y: 955, width: 295, height: 320 },
  { x: 330, y: 955, width: 290, height: 320 },
  { x: 620, y: 955, width: 285, height: 320 },
]

export default function LuchiSprite({ poseIndex = 0, className, label = 'Ilustración de Luchi' }) {
  const safeIndex = poseIndex % LUCHI_POSES.length
  const column = safeIndex % 4
  const row = Math.floor(safeIndex / 4)
  const style = {
    backgroundImage: `url("${SPRITE_SHEET}")`,
    backgroundPosition: `${column * (100 / 3)}% ${row * (100 / 3)}%`,
  }

  return (
    <span
      className={className}
      style={style}
      role="img"
      aria-label={label}
    />
  )
}
