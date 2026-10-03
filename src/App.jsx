import { useState } from 'react'
import './App.css'

const LETTER = `
Después de todo lo que viví, después de los días difíciles,
los hospitales, la rehabilitación, el miedo, el cansancio
y esos momentos en los que sentía que estaba perdiendo todo...

apareciste vos.

Y no sé exactamente cómo explicarlo,
porque no fue un cambio grande ni espectacular,
pero sí fue uno de esos cambios que se sienten en el cuerpo,
en el alma, en la forma en que uno vuelve a mirar el mundo.

Vos me devolviste las ganas de reírme con ganas.
De esas risas verdaderas, sin filtro,
las que salen sin avisar y te hacen olvidar por un rato
que la vida también puede ser pesada.

Me devolviste una parte de mí que había dejado de usar
porque la había escondido en algún lugar que casi no recordaba.

Y, sobre todo,
me devolviste mi brillo.

Ese brillo que alguna vez estuvo ahí,
y que, sin darme cuenta, se había ido apagando un poquito.

Con vos volví a sentirme linda.
Divertida.
Querida.
Acompañada.

Volví a disfrutar cosas simples.
A esperar un mensaje con una sonrisa.
A tener ganas de hablar.
De reírme.
De hacer planes.
De sentir que todavía podía pasarme algo lindo.

Y después de todo lo que atravesé,
eso significa muchísimo para mí.

Porque me recordaste que al final de todo
seguía estando esa chica que se ríe fuerte,
que siente muchísimo,
que se emociona por las pequeñas cosas,
y que todavía tiene muchísimo amor para dar.

A veces una persona no tiene que hacer algo enorme
para cambiarte la vida.

A veces alcanza con hacerte sentir nuevamente vos.

Y cuando miro mis fotos,
cuando me escucho reír
o cuando me veo en el espejo
y noto nuevamente ese brillo en mis ojos,

pienso que quizás una de las cosas más lindas
que alguien puede regalarte
es devolverte, aunque sea un poquito,
las ganas de ser vos misma.

Gracias, Luchi.

Por llegar en un momento tan particular de mi vida
y hacerme recordar que todavía podía reírme así,
que todavía podía ilusionarme,
que todavía podía sentirme...

querida.

Y no es solo que me hicieras sentir así.
Es que me ayudaste a recordar que yo también merecía
ser tratada con ternura,
ser escuchada con paciencia,
ser mirada con amor.

Y eso me hizo sentir más viva.
Más yo.
Más en paz.

Te agradezco por haber aparecido en este capítulo de mi vida
con tanta suavidad,
con tanta gentileza,
con tanta luz.

Y por haberme devuelto, aunque sea un poquito,
la confianza de volver a creer
que también puede haber algo lindo,
algo real,
algo que te haga sonreír sin esfuerzo.

Así me hiciste sentir vos.
Y por eso te quiero agradecer de una manera tan simple
como honesta:
porque me devolviste el brillo.

Porque me devolviste la alegría.

Porque me devolviste a mí.
`

const playlist = [
  {
    title: 'Si Te Sentís Sola',
    emoji: '💗',
    url: 'https://open.spotify.com/search/Si%20Te%20Sent%C3%ADs%20Sola',
  },
  {
    title: 'Goteo',
    emoji: '💎',
    url: 'https://open.spotify.com/search/Goteo',
  },
  {
    title: 'H.I.E.L.O.',
    emoji: '🧊',
    url: 'https://open.spotify.com/search/HIELO',
  },
  {
    title: 'She Dont Give a FO',
    emoji: '🖤',
    url: 'https://open.spotify.com/search/She%20Dont%20Give%20a%20FO',
  },
]

const medicines = [
  { name: 'Abrazo 500 mg', icon: '🫂', message: 'Indicaciones: vení, que te abrazo hasta que se te pase un poquito el cansancio.' },
  { name: 'Beso sublingual', icon: '💋', message: 'Acción rápida y efecto prolongado: un beso mío, directo al corazón.' },
  { name: 'Mimos XR', icon: '🧸', message: 'Liberación extendida de mimos para acompañarte durante todo el día.' },
  { name: 'Te extraño Forte', icon: '💌', message: 'Dosis recomendada: que sepas que te pienso más de lo que digo.' },
  { name: 'Quedate conmigo 24 h', icon: '🕰️', message: 'Tratamiento ideal: un día entero cerquita tuyo, sin mirar el reloj.' },
]

const letters = [
  { title: 'Abrir cuando estés cansado', message: 'No tenés que poder con todo todo el tiempo. Ojalá pudiera alcanzarte un abrazo, dejarte descansar y recordarte que también merecés que te cuiden.' },
  { title: 'Abrir cuando tengas un día de mierda', message: 'Este día no define quién sos ni todo lo bueno que hacés. Respirá: ya pasó una parte, y no tenés que atravesar lo que queda solo.' },
  { title: 'Abrir cuando me extrañes', message: 'Yo también te extraño. Guardate este mensajito como un abrazo a distancia, con la promesa de que quiero volver a verte pronto.' },
  { title: 'Abrir cuando necesites recordar cuánto valés', message: 'Valés por quien sos, por cómo escuchás, por cómo cuidás y también por todo lo que sos cuando no estás cuidando a nadie.' },
  { title: 'Abrir cuando estés feliz', message: 'Me encanta imaginarte feliz. Ojalá pudiera estar ahí para festejar con vos y guardar un pedacito de este momento en la memoria.' },
  { title: 'Abrir cuando no puedas dormir', message: 'Aflojá los hombros, soltá el día de a poquito. No hace falta resolver nada ahora. Cerrá los ojos: te mando calma y un beso.' },
  { title: 'Abrir cuando necesites una sonrisa', message: 'Receta sencilla: acordate de alguna de nuestras pavadas, sonreí aunque sea un poquito y pensá que hay alguien que te quiere un montón.' },
]

const gameHearts = ['abrazo', 'beso', 'sonrisa', 'mimos', 'te quiero']

function Heart({ filled = false }) {
  return <span className={filled ? 'heart filled' : 'heart'}>♥</span>
}

function App() {
  const [step, setStep] = useState(0)
  const [heartFound, setHeartFound] = useState(false)
  const [treatment, setTreatment] = useState(null)
  const [pulse, setPulse] = useState(0)
  const [letterOpen, setLetterOpen] = useState(false)
  const [envelopeOpen, setEnvelopeOpen] = useState(false)
  const [selectedMedicine, setSelectedMedicine] = useState(null)
  const [diagnosisVisible, setDiagnosisVisible] = useState(false)
  const [gameScore, setGameScore] = useState(0)
  const [gameTurn, setGameTurn] = useState(0)
  const [selectedLetter, setSelectedLetter] = useState(null)

  const completed = heartFound && treatment === 'amor' && pulse >= 5

  function resetGame() {
    setStep(0)
    setHeartFound(false)
    setTreatment(null)
    setPulse(0)
    setLetterOpen(false)
    setEnvelopeOpen(false)
    setSelectedMedicine(null)
    setDiagnosisVisible(false)
    setGameScore(0)
    setGameTurn(0)
    setSelectedLetter(null)
  }

  function downloadCertificate() {
    const certificate = `<!doctype html><html lang="es"><meta charset="utf-8"><title>Certificado oficial para Lucio</title><style>body{margin:0;background:#fff3f6;color:#412f36;font:18px Georgia,serif;display:grid;place-items:center;min-height:100vh}.diploma{box-sizing:border-box;width:min(900px,92vw);padding:70px 55px;text-align:center;background:#fffdfb;border:12px double #e87894;outline:1px solid #e87894;outline-offset:-24px}h1{color:#d64f75;font-size:40px;letter-spacing:5px}h2{font-size:54px;margin:18px}p{line-height:1.8}.skills{display:inline-block;text-align:left;line-height:2}.signature{margin-top:40px;color:#bb5875;font-style:italic}@media print{body{background:white}.diploma{width:100%;min-height:95vh}}</style><main class="diploma"><p>🏆</p><h1>CERTIFICADO OFICIAL</h1><p>Se certifica que</p><h2>LUCIO</h2><p>ha demostrado competencias excepcionales en:</p><div class="skills">☑ Cuidar<br>☑ Escuchar<br>☑ Hacer reír<br>☑ Dar tranquilidad<br>☑ Robar corazones</div><p><strong>Especialización:</strong><br>Enfermería + cuidado emocional no autorizado.</p><p class="signature">La paciente que no piensa devolverte el corazón.</p></main></html>`
    const file = new Blob([certificate], { type: 'text/html;charset=utf-8' })
    const url = URL.createObjectURL(file)
    const link = document.createElement('a')
    link.href = url
    link.download = 'certificado-oficial-lucio.html'
    link.click()
    window.setTimeout(() => URL.revokeObjectURL(url), 1000)
  }

  return (
    <div className="app-shell">
      <div className="floating f1">♡</div>
      <div className="floating f2">✦</div>
      <div className="floating f3">🩹</div>
      <div className="floating f4">♡</div>
      <div className="floating f5">✧</div>

      <header className="topbar">
        <div className="logo">
          <span>♡</span>
          <div>
            <strong>LOVE CARE</strong>
            <small>PRIVATE CASE FILE</small>
          </div>
        </div>

        <div className="case-number">CASO Nº 001</div>
      </header>

      <section className="hero">
        <div className="hero-stickers" aria-hidden="true">
          <span className="mini-sticker pink">♡</span>
          <span className="mini-sticker">✦</span>
          <span className="mini-sticker pink">🩹</span>
        </div>

        <div className="medical-sticker">
          <div className="sticker-cross">+</div>
          <span>♡</span>
        </div>

        <p className="eyebrow">🩺 EXPEDIENTE CONFIDENCIAL</p>

        <h1>
          El enfermero
          <br />
          que me devolvió
          <span> el brillo.</span>
        </h1>

        <p className="hero-subtitle">
          Hay historias que no se cuentan como una historia.
          <br />
          Algunas se diagnostican con el corazón.
        </p>

        <div className="ecg-strip" aria-hidden="true">
          <span>▁▂▃▄▅▆▇█▇▆▅▄▃▂▁</span>
        </div>

        <button type="button" className="start-button" onClick={() => setStep(1)}>
          Abrir expediente
          <span>♡</span>
        </button>

        <div className="hero-note">
          <span>♥</span>
          elaborado especialmente para Luchi
          <span>♥</span>
        </div>
      </section>

      {step >= 1 && (
        <>
          <nav className="module-nav" aria-label="Secciones del expediente">
            <a href="#guardia">Guardia</a>
            <a href="#farmacia">Farmacia</a>
            <a href="#monitor">Monitor</a>
            <a href="#laboratorio">Laboratorio</a>
            <a href="#certificado">Certificado</a>
            <a href="#juego">Juego</a>
            <a href="#cartas">Cartas</a>
          </nav>

          <main className="love-modules">
            <section className="module night-shift" id="guardia">
              <div className="module-kicker">REGISTRO DE GUARDIA · TURNO NOCHE</div>
              <div className="night-clock">03:17 <span>AM</span></div>
              <p className="night-quote">Mientras vos cuidás a otros,<br />hay alguien pensando en quién cuida de vos.</p>
              <p className="night-note">Sé que hay noches en las que estás cansado, que cargás con la facultad, el trabajo y todo lo demás… y aun así seguís teniendo esa forma hermosa de cuidar.</p>
            </section>

            <section className="module pharmacy" id="farmacia">
              <div className="module-kicker">FARMACIA DEL AMOR · RECETA Nº 001</div>
              <div className="medicine-label">
                <div className="medicine-brand">LUCIO<sup>®</sup></div>
                <div className="medicine-details">
                  <p><b>Principio activo:</b> ternura</p>
                  <p><b>Dosis:</b> según necesidad</p>
                  <p><b>Administración:</b> abrazos / besos / mimos</p>
                  <p><b>Efectos adversos:</b> mariposas, sonrisas y dependencia emocional.</p>
                  <p><b>Contraindicaciones:</b> ninguna conocida.</p>
                </div>
              </div>
              <div className="medicine-list">
                {medicines.map((medicine) => (
                  <button key={medicine.name} type="button" className={selectedMedicine?.name === medicine.name ? 'medicine-option selected' : 'medicine-option'} onClick={() => setSelectedMedicine(medicine)}>
                    <span>{medicine.icon}</span>{medicine.name}
                  </button>
                ))}
              </div>
              {selectedMedicine && <p className="medicine-message" role="status">{selectedMedicine.message}</p>}
            </section>

            <section className="module heart-monitor" id="monitor">
              <div className="module-kicker">MONITOR CARDÍACO · PACIENTE: PAULINA</div>
              <div className="monitor-screen">
                <div className="monitor-hearts" aria-label="Cinco corazones">♥ ♥ ♥ ♥ ♥</div>
                <div className="monitor-pulse" aria-hidden="true">▁▁▂▁▁▁▅▇▂▁▁▁▂▁▁▁▅▇▂▁▁</div>
                <div className="beating-heart" aria-hidden="true">♥</div>
                <p>Frecuencia cardíaca: <strong>anormalmente elevada.</strong></p>
                <p>Causa probable: <strong>un enfermero.</strong></p>
              </div>
              <button className="module-button" type="button" onClick={() => setDiagnosisVisible(true)}>Ver diagnóstico</button>
              {diagnosisVisible && <p className="diagnosis-reveal" role="status">Diagnóstico definitivo: <strong>Lucio.</strong> ❤️</p>}
            </section>

            <section className="module lab" id="laboratorio">
              <div className="module-kicker">LABORATORIO DE SENTIMIENTOS · INFORME</div>
              <div className="lab-table" role="table" aria-label="Resultados del análisis sentimental">
                {[
                  ['Cariño', '100%', 100], ['Confianza', '100%', 100], ['Mariposas', '999%', 100],
                  ['Ganas de verlo', 'CRÍTICO', 100], ['Capacidad de olvidarlo', '0%', 0], ['Amor', 'POSITIVO ❤️', 100],
                ].map(([name, result, fill]) => (
                  <div className="lab-row" role="row" key={name}>
                    <strong role="cell">{name}</strong>
                    <span className="lab-bar" role="cell"><i style={{ width: `${fill}%` }} /></span>
                    <b role="cell">{result}</b>
                  </div>
                ))}
              </div>
              <p className="lab-result"><b>Resultado:</b> incompatible con dejar de quererte.</p>
            </section>

            <section className="module certificate" id="certificado">
              <div className="module-kicker">DOCUMENTO DE RECONOCIMIENTO</div>
              <div className="certificate-paper">
                <div className="certificate-medal">🏆</div>
                <h2>CERTIFICADO OFICIAL</h2>
                <p>Se certifica que</p>
                <h3>LUCIO</h3>
                <p>ha demostrado competencias excepcionales en:</p>
                <ul><li>Cuidar</li><li>Escuchar</li><li>Hacer reír</li><li>Dar tranquilidad</li><li>Robar corazones</li></ul>
                <p><b>Especialización:</b><br />Enfermería + cuidado emocional no autorizado.</p>
                <p className="certificate-signature">La paciente que no piensa devolverte el corazón.</p>
              </div>
              <button className="module-button" type="button" onClick={downloadCertificate}>Descargar certificado</button>
            </section>

            <section className="module love-game" id="juego">
              <div className="module-kicker">MINI JUEGO · ATRAPÁ LOS CORAZONES</div>
              <h2>Juntá 100 puntos de amor</h2>
              <p>Cada corazón que atrapes suma 20 puntos.</p>
              <div className="game-score" aria-live="polite">{gameScore} <span>/ 100</span></div>
              {gameScore < 100 ? (
                <button className="catch-heart" type="button" onClick={() => { setGameScore((score) => Math.min(score + 20, 100)); setGameTurn((turn) => turn + 1) }}>
                  <span>❤️</span>
                  <b>{gameHearts[gameTurn % gameHearts.length]}</b>
                  <small>atrapar · +20 puntos</small>
                </button>
              ) : (
                <div className="game-unlocked" role="status">
                  <h3>🎉 ¡MISIÓN COMPLETADA!</h3>
                  <p>Has conseguido suficientes puntos para desbloquear:</p>
                  <strong>UNA CARTA QUE NO ESTABA EN EL EXPEDIENTE.</strong>
                  <p>Lucio, entre todas las cosas lindas que me pasaron, conocerte se volvió una de mis favoritas. Gracias por cuidarme también con tu forma de estar, por hacerme reír y por devolverme un poquito de luz. Te quiero muchísimo, y ojalá la vida nos regale muchos abrazos más. ❤️</p>
                </div>
              )}
            </section>

            <section className="module open-letters" id="cartas">
              <div className="module-kicker">ARCHIVO PERSONAL · PARA LUCIO</div>
              <h2>Cartas para abrir cuando…</h2>
              <div className="letter-buttons">
                {letters.map((letter, index) => <button type="button" key={letter.title} className={selectedLetter === index ? 'letter-choice selected' : 'letter-choice'} onClick={() => setSelectedLetter(index)}>💌 {letter.title}</button>)}
              </div>
              {selectedLetter !== null && <article className="opened-letter" role="status"><span>PARA LEER DESPACITO</span><p>{letters[selectedLetter].message}</p><strong>Estoy con vos. ♡</strong></article>}
            </section>
          </main>
        </>
      )}

      {step >= 1 && !completed && (
        <section className="game-card">
          <div className="case-header">
            <div>
              <span className="case-label">CASO CLÍNICO Nº 001</span>
              <h2>Tenemos un pequeño problema...</h2>
            </div>
            <div className="mini-heart">♥</div>
          </div>

          <div className="progress">
            <div
              style={{
                width: `${(
                  ((heartFound ? 1 : 0) + (treatment ? 1 : 0) + (pulse >= 5 ? 1 : 0)) /
                  3
                ) * 100}%`,
              }}
            />
          </div>

          {!heartFound && (
            <div className="test">
              <span className="test-number">PRUEBA 01 / 03</span>
              <h3>Encontrá el corazón escondido 🩷</h3>
              <p>El paciente presenta una cantidad sospechosamente alta de ternura.</p>

              <div className="heart-hunt">
                <button type="button" className="hunt-item" onClick={() => setHeartFound(true)}>
                  ♡
                </button>
                <span>🩺</span>
                <span>🩹</span>
                <span>✦</span>
                <span>💊</span>
                <span>✧</span>
                <span>☁</span>
                <span>+</span>
                <span>🩺</span>
              </div>

              <small>Pista: está donde menos lo esperás.</small>
            </div>
          )}

          {heartFound && !treatment && (
            <div className="test">
              <span className="test-number">PRUEBA 02 / 03</span>
              <h3>¿Cuál es el tratamiento indicado? 🩺</h3>
              <p>El corazón presenta una rara condición: quiere sentirse querido.</p>

              <div className="treatment-grid">
                <button type="button" onClick={() => setTreatment('descanso')}>
                  🛏️
                  <span>Reposo absoluto</span>
                </button>
                <button type="button" onClick={() => setTreatment('amor')}>
                  💗
                  <span>Una dosis de amor</span>
                </button>
                <button type="button" onClick={() => setTreatment('vitaminas')}>
                  💊
                  <span>Vitaminas</span>
                </button>
                <button type="button" onClick={() => setTreatment('cafe')}>
                  ☕
                  <span>Café intravenoso</span>
                </button>
              </div>

              {treatment === 'descanso' && (
                <p className="wrong">Diagnóstico incorrecto 😂. Este corazón necesita otra cosa.</p>
              )}

              {treatment === 'vitaminas' && (
                <p className="wrong">Casi, enfermero. Pero acá hay algo más fuerte. 💗</p>
              )}

              {treatment === 'cafe' && (
                <p className="wrong">Sos enfermero, no una máquina de café 😂</p>
              )}
            </div>
          )}

          {heartFound && treatment === 'amor' && pulse < 5 && (
            <div className="test">
              <span className="test-number">PRUEBA 03 / 03</span>
              <h3>Tomemos el pulso ❤️</h3>
              <p>Tocá el corazón cinco veces para comprobar que todavía funciona.</p>

              <button
                type="button"
                className="pulse-button"
                onClick={() => setPulse((current) => Math.min(current + 1, 5))}
              >
                <Heart filled />
                <strong>{pulse}</strong>
                <small>BPM emocional</small>
              </button>

              <div className="pulse-line">──♥──♥──♥──</div>
            </div>
          )}
        </section>
      )}

      {completed && !letterOpen && (
        <section className="unlock">
          <div className="unlock-icon">✓</div>
          <span className="test-number">DIAGNÓSTICO COMPLETADO</span>
          <h2>
            Caso resuelto,
            <br />
            enfermero. 🩷
          </h2>

          <div className="diagnosis">
            <div>
              <small>DIAGNÓSTICO</small>
              <strong>Síndrome de sonrisa recuperada</strong>
            </div>
            <div>
              <small>CAUSA PROBABLE</small>
              <strong>Luchi.</strong>
            </div>
            <div>
              <small>TRATAMIENTO</small>
              <strong>Seguir siendo vos. ✨</strong>
            </div>
          </div>

          <button type="button" className="start-button" onClick={() => setLetterOpen(true)}>
            Abrir el verdadero regalo
            <span>♡</span>
          </button>
        </section>
      )}

      {letterOpen && (
        <section className="letter-section">
          <div className="letter-top">
            <span>PRIVATE LOVE LETTER</span>
            <span>♡ 001</span>
          </div>

          <div className="letter-wrap">
            <div
              className={`envelope ${envelopeOpen ? 'is-open' : ''}`}
              onClick={() => setEnvelopeOpen(true)}
              role="button"
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault()
                  setEnvelopeOpen(true)
                }
              }}
            >
              <div className="envelope-spark spark-one">✦</div>
              <div className="envelope-spark spark-two">♡</div>
              <div className="envelope-flap" />
              <div className="envelope-body">
                <span>FOR LUCHI ♡</span>
                <small>private love letter</small>
              </div>
            </div>

            <article className={`letter-card ${envelopeOpen ? 'visible' : ''}`}>
              <div className="letter-decoration">🩺　♡　🩹　♡　✦</div>
              <h2>Para vos, Luchi.</h2>

              <div className="letter-text">
                {LETTER.split('\n').map((line, index) => (
                  <p key={index}>{line || '\u00A0'}</p>
                ))}
              </div>

              <div className="signature">
                <span>con amor,</span>
                <strong>yo ♡</strong>
              </div>
            </article>
          </div>

          <div className="little-things">
            <h2>
              Cosas que quizás no sabés
              <span> que hiciste por mí.</span>
            </h2>

            <div className="little-grid">
              <article>
                <span>01</span>
                <b>Me hiciste reír</b>
                <p>Pero reír de verdad.</p>
              </article>

              <article>
                <span>02</span>
                <b>Me devolviste las ganas</b>
                <p>De esperar cosas lindas.</p>
              </article>

              <article>
                <span>03</span>
                <b>Me hiciste sentir linda</b>
                <p>Incluso en días en los que yo no me veía así.</p>
              </article>

              <article>
                <span>04</span>
                <b>Me devolviste el brillo</b>
                <p>Y eso no sé cómo agradecértelo.</p>
              </article>
            </div>
          </div>

          <section className="playlist">
            <div className="playlist-title">
              <span>♡ PLAYLIST</span>
              <h2>Canciones para vos</h2>
              <p>Porque algunas personas también se recuerdan con música.</p>
            </div>

            <div className="songs">
              {playlist.map((song, index) => (
                <a
                  key={song.title}
                  href={song.url}
                  target="_blank"
                  rel="noreferrer"
                  className="song"
                >
                  <div className="song-number">0{index + 1}</div>
                  <div className="album">{song.emoji}</div>
                  <div className="song-info">
                    <strong>{song.title}</strong>
                    <small>playlist visual · para Luchi</small>
                  </div>
                  <div className="play">▶</div>
                </a>
              ))}
            </div>
          </section>

          <section className="final-message">
            <div className="big-heart">♥</div>

            <h2>
              Gracias por aparecer
              <br />
              cuando apareciste.
            </h2>

            <p>
              No sé qué va a pasar mañana.
              Pero sé que hoy hay una versión de mí
              que vuelve a sonreír con ganas.
            </p>

            <strong>Y eso también tiene un poquito de vos. ♡</strong>

            <div className="mini-credential">
              <span>especialidad</span>
              <strong>hacerme sonreír</strong>
            </div>

            <div className="nurse-badge">
              <div className="badge-micro">♡</div>
              <div className="badge-icon">🩺</div>
              <span>
                LUCHI
                <small>ENFERMERO</small>
              </span>
              <div className="badge-ribbon">certificado</div>
              <div className="badge-heart">♡</div>
            </div>
          </section>
          <button type="button" className="restart" onClick={resetGame}>
            ↻ volver al expediente
          </button>
        </section>
      )}

      <footer>Hecho a mano con código, amor y un poquito de locura. ♡</footer>
    </div>
  )
}

export default App
