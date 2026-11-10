# Gengar sprite sheet

The sprite sheet is imported from
`src/assets/gengar/gengar-sprites.png` by
`src/components/gengar/gengarConfig.js`.

The sheet is **924 × 768 pixels**, arranged in 6 columns and 5 rows, with a
transparent background. The current configuration derives the frame size from
those dimensions.

| Row | Animation | Frames | Default speed |
| --- | --- | ---: | ---: |
| 0 | WALK | 6 | 8 FPS |
| 1 | IDLE | 6 | 4 FPS |
| 2 | TURN | 6 | 8 FPS |
| 3 | DISAPPEAR | 6 | 10 FPS |
| 4 | APPEAR | 6 | 10 FPS |

To use a different sheet, update `src/components/gengar/gengarConfig.js` to
match its dimensions, column and row counts, frame counts, and speeds.
