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

  const completed = heartFound && treatment === 'amor' && pulse >= 5

  function resetGame() {
    setStep(0)
    setHeartFound(false)
    setTreatment(null)
    setPulse(0)
    setLetterOpen(false)
    setEnvelopeOpen(false)
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
