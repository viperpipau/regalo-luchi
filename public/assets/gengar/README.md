# Gengar sprite sheet

The sprite sheet is imported from
`src/assets/gengar/gengar-sprites.jpg` by
`src/components/gengar/gengarConfig.js`.

The sheet is **1136 × 944 pixels**, arranged in 6 columns and 5 rows. The
current configuration derives the frame size from those dimensions. The
checkerboard background is part of the JPEG image, not transparency.

| Row | Animation | Frames | Default speed |
| --- | --- | ---: | ---: |
| 0 | WALK | 6 | 8 FPS |
| 1 | IDLE | 4 | 4 FPS |
| 2 | TURN | 4 | 8 FPS |
| 3 | DISAPPEAR | 6 | 10 FPS |
| 4 | APPEAR | 6 | 10 FPS |

To use a different sheet, update `src/components/gengar/gengarConfig.js` to
match its dimensions, column and row counts, frame counts, and speeds.
