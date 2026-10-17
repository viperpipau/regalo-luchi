import { useEffect, useRef, useState } from 'react'
import './ExpedienteCover.css'

export const EXPEDIENTE_OPEN_DATE = '06 / 10 / 2026'

const reassuranceMessage = [
  'Quiero decirte algo, y quiero que me escuches de corazón.',
  'Sé que estás triste, que te sentís mal y que seguramente tu cabeza no deja de darle vueltas a lo que pasó, pensando en lo que podrías haber hecho diferente. Y sé que, por más cosas que te diga, quizás hoy sea difícil que dejes de sentir esa culpa.',
  'Pero necesito que recordés lo que te dije, un error no te hace dejar de ser el mejor del mundo mundial, ni borra todo lo bueno que hiciste por todos nosotros!',
  'Yo sé la clase de enfermero que sos. Sé cuánto das, cuánto te preocupás, cuánto te importa cada paciente. Y también sé que detrás de ese uniforme hay una persona, un ser humano prechiocho que se cansa, que siente, que se equivoca y que, aunque quisiera, no puede tener el control de absolutamente todo.',
  'Ojalá pudiéramos anticiparnos a cada cosa que va a pasar. Ojalá alcanzara con tener buenas intenciones y hacer nuestro trabajo con amor para que nunca sucediera nada malo. Pero la vida no funciona así.',
  'Y no te voy a decir que no pasó nada, porque sé que para vos pasó mucho. Tampoco voy a minimizar lo que sentís, porque si hoy te duele tanto es justamente porque te importa. Pero una cosa es reconocer que algo salió mal y otra muy distinta es castigarte como si todo lo que sos se redujera a ese momento.',
  'Vos sos muchísimo más que ese segundo. Sos todas las veces que estuviste ahí cuando alguien te necesitó. Sos las manos que cuidaron, que aliviaron dolores, que salvaron vidas. Sos las noches de cansancio, las preocupaciones que te llevaste a tu casa, las veces que hiciste mucho más de lo que te correspondía por alguien que necesitaba ayuda.',
  'Y nada de eso desaparece por lo que pasó hoy, ok?',
  'No quiero que seas tan cruel con vos mismo. Porque si esto le hubiera pasado a un compañero al que querés, estoy segura de que tendrías palabras de comprensión para él. Entonces, por qué no merecés vos también esa misma comprensión?',
  'Aprendé de lo que pasó, hacete cargo de lo que te corresponda, pero no te condenes. No confundas responsabilidad con tener que sufrir para siempre. No necesitás destruirte por dentro para demostrar que te importa.',
  'Y si hoy no podés perdonarte, está bien. No tenés que resolver todo ahora. Date tiempo, hablá, descargate, pero por favor no te olvides de la persona que sos.',
  'Porque yo no veo a un mal enfermero. Veo a un buen ser humano atravesando un momento muy difícil.',
  'Y quiero que sepas que yo sigo viendo en vos al mismo enfermero de siempre, con la misma vocación, el mismo corazón y el mismo valor.',
  'No permitas que uno de los momentos más difíciles de tu profesión te haga olvidar todas las razones por las que elegiste dedicar tu vida a cuidar a los demás.',
  'Y esta vez, que sos vos el que está sufriendo, dejá que alguien también te cuide un poquito. No tenés que ser fuerte todo el tiempo mi amor❤️',
]

export default function ExpedienteCover({ onOpen }) {
  const [opening, setOpening] = useState(false)
  const [messageOpen, setMessageOpen] = useState(false)
  const timerRef = useRef(null)

  useEffect(() => () => window.clearTimeout(timerRef.current), [])

  const openFile = () => {
    if (opening) return
    setOpening(true)
    timerRef.current = window.setTimeout(onOpen, 360)
  }

  return (
    <main className={opening ? 'expediente-cover is-opening' : 'expediente-cover'}>
      <section className="cover-folder" aria-labelledby="cover-title">
        <div className="cover-tab">LOVE CARE · ARCHIVO 001</div>
        <div className="cover-seal" aria-hidden="true">CONFIDENCIAL</div>
        <div className="module-kicker">DOCUMENTACIÓN CLÍNICA · USO AUTORIZADO</div>
        <div className="cover-mark" aria-hidden="true">♡</div>
        <h1 id="cover-title">EXPEDIENTE CLÍNICO<br />CONFIDENCIAL</h1>
        <div className="cover-number">EXPEDIENTE Nº 001</div>

        <dl className="cover-data">
          <div><dt>PACIENTE</dt><dd>PAULINA</dd></div>
          <div><dt>RESPONSABLE</dt><dd>LUCHI</dd></div>
          <div><dt>SERVICIO</dt><dd>CARDIOLOGÍA EMOCIONAL</dd></div>
          <div><dt>CLASIFICACIÓN</dt><dd>CONFIDENCIAL</dd></div>
          <div><dt>ESTADO</dt><dd>EN SEGUIMIENTO</dd></div>
          <div><dt>FECHA DE APERTURA</dt><dd>{EXPEDIENTE_OPEN_DATE}</dd></div>
        </dl>

        <div className="cover-restricted">ACCESO RESTRINGIDO</div>
        <button type="button" className="start-button" onClick={openFile} disabled={opening}>
          ABRIR EXPEDIENTE <span>♡</span>
        </button>
        <button
          type="button"
          className="cover-note-button"
          aria-expanded={messageOpen}
          aria-controls="cover-reassurance-message"
          aria-label={messageOpen ? 'HOY, cerrar mensaje' : 'HOY, abrir mensaje'}
          onClick={() => setMessageOpen((isOpen) => !isOpen)}
        >
          HOY <span aria-hidden="true">{messageOpen ? '❤️‍🩹' : '💔'}</span>
        </button>
        {messageOpen && (
          <section
            id="cover-reassurance-message"
            className="cover-message"
            aria-labelledby="cover-message-title"
          >
            <h2 id="cover-message-title">Quiero decirte algo</h2>
            {reassuranceMessage.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
        )}
      </section>
    </main>
  )
}
