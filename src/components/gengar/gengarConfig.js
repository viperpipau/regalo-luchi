export const gengarConfig = {
  spriteSheet: `${import.meta.env.BASE_URL}assets/gengar/gengar-sprites.png`,
  frameWidth: 64,
  frameHeight: 64,
  columns: 6,
  rows: 5,
  displaySize: {
    desktop: 96,
    mobile: 72,
    mobileBreakpoint: 560,
  },
  movementSpeed: 72,
  animations: {
    WALK: { row: 0, frames: 6, fps: 8, loop: true },
    IDLE: { row: 1, frames: 4, fps: 4, loop: true },
    TURN: { row: 2, frames: 4, fps: 8, loop: false },
    DISAPPEAR: { row: 3, frames: 6, fps: 10, loop: false },
    APPEAR: { row: 4, frames: 6, fps: 10, loop: false },
  },
}
