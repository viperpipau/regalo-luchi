# Gengar sprite sheet

Add the provided transparent PNG sprite sheet at:

`public/assets/gengar/gengar-sprites.png`

Default sheet dimensions are **384 × 320 pixels**. Each frame is **64 × 64
pixels**, arranged in 6 columns and 5 rows. Keep each frame's background
transparent and align the character consistently within the cells.

| Row | Animation | Frames | Default speed |
| --- | --- | ---: | ---: |
| 0 | WALK | 6 | 8 FPS |
| 1 | IDLE | 4 | 4 FPS |
| 2 | TURN | 4 | 8 FPS |
| 3 | DISAPPEAR | 6 | 10 FPS |
| 4 | APPEAR | 6 | 10 FPS |

Unused cells in a row can remain transparent. To use different dimensions,
column counts, row positions, frame counts, or speeds, update
`src/components/gengar/gengarConfig.js` to match the supplied sheet.
