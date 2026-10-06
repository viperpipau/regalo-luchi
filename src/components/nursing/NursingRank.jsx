export default function NursingRank({ progress, rank }) {
  return (
    <div className="nursing-rank" aria-label="Progreso de enfermería">
      <div><span>RANGO ACTUAL</span><strong>{rank}</strong></div>
      <div><span>PUNTOS</span><strong>{progress.points.toLocaleString('es-AR')}</strong></div>
      <div><span>RACHA</span><strong>x{progress.currentStreak}</strong></div>
      <div><span>CORRECTAS</span><strong>{progress.correct}</strong></div>
      <div><span>INCORRECTAS</span><strong>{progress.incorrect}</strong></div>
    </div>
  )
}
