import { useEffect, useState } from 'react'
import './MemoriesGallery.css'

const memories = [
  'recuerdo-01.jpg',
  'recuerdo-02.jpg',
  'recuerdo-03.jpg',
  'recuerdo-04.jpg',
  'recuerdo-05.jpg',
  'recuerdo-06.jpg',
  'recuerdo-07.jpg',
  'recuerdo-08.jpg',
  'recuerdo-09.jpg',
  'recuerdo-10.jpg',
  'recuerdo-11.jpg',
  'recuerdo-12.jpg',
  'recuerdo-13.jpg',
  'recuerdo-14.jpg',
  'recuerdo-15.jpg',
  'recuerdo-16.jpg',
  'recuerdo-17.jpg',
  'recuerdo-18.jpg',
  'recuerdo-19.jpg',
  'recuerdo-20.jpg',
  'recuerdo-21.jpg',
  'recuerdo-22.jpg',
  'recuerdo-23.jpg',
  'recuerdo-24.jpg',
]

const captions = [
  'Mi lugar favorito: cerquita tuyo.',
  'Una sonrisa que quiero guardar.',
  'Así se siente estar en casa.',
  'Que nunca nos falten estos abrazos.',
  'Un plan simple, un recuerdo enorme.',
  'Vos y yo, y todo está bien.',
  'De esos días que se quedan.',
  'Mi persona favorita en mi lugar favorito.',
  'Un poquito de sol y mucho amor.',
  'Ojalá repetir este momento mil veces.',
  'La felicidad también se ve así.',
  'Un paseo para atesorar.',
  'Tu sonrisa siempre mejora la foto.',
  'No necesito más que este ratito.',
  'Qué lindo coincidir con vos.',
  'Mi corazón, en buenas manos.',
  'Un beso que dice todo.',
  'Así, juntitos, siempre.',
  'La vida se siente más linda a tu lado.',
  'Una aventura más para nuestra colección.',
  'Mi abrazo preferido.',
  'Gracias por tantos momentos bonitos.',
  'Y que vengan muchos días como este.',
  'Te elijo en cada recuerdo.',
]

function MemoriesGallery() {
  const [selectedIndex, setSelectedIndex] = useState(null)

  useEffect(() => {
    if (selectedIndex === null) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setSelectedIndex(null)
      if (event.key === 'ArrowLeft') {
        setSelectedIndex((current) => (current - 1 + memories.length) % memories.length)
      }
      if (event.key === 'ArrowRight') {
        setSelectedIndex((current) => (current + 1) % memories.length)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedIndex])

  const movePhoto = (direction) => {
    setSelectedIndex((current) => (current + direction + memories.length) % memories.length)
  }

  const selectedPhoto = selectedIndex === null ? null : memories[selectedIndex]

  return (
    <section className="module memories-section" id="recuerdos">
      <div className="memories-heading">
        <span className="memories-kicker">NUESTRO PEQUEÑO UNIVERSO · 24 RECUERDOS</span>
        <h2>Un álbum de nosotros <span>♡</span></h2>
        <p>
          Cada foto guarda un pedacito de lo feliz que me hace compartir la vida con vos.
          Gracias por ser mi lugar favorito, Luchi.
        </p>
      </div>

      <div className="memories-grid">
        {memories.map((photo, index) => (
          <button
            className="memory-card"
            key={photo}
            type="button"
            onClick={() => setSelectedIndex(index)}
            aria-label={`Abrir recuerdo ${index + 1}: ${captions[index]}`}
          >
            <img
              src={`${import.meta.env.BASE_URL}fotos/recuerdos/${photo}`}
              alt={`Recuerdo juntos ${index + 1}`}
              loading="lazy"
            />
            <span className="memory-caption">{captions[index]}</span>
            <span className="memory-heart" aria-hidden="true">♡</span>
          </button>
        ))}
      </div>

      <p className="memories-signoff">Mi parte favorita de cada día sigue siendo vos. <span>♥</span></p>

      {selectedPhoto && (
        <div
          className="memory-lightbox"
          role="presentation"
          onClick={(event) => {
            if (event.target === event.currentTarget) setSelectedIndex(null)
          }}
        >
          <section className="memory-viewer" role="dialog" aria-modal="true" aria-label="Foto del álbum">
            <button
              className="memory-close"
              type="button"
              onClick={() => setSelectedIndex(null)}
              aria-label="Cerrar foto"
            >
              ×
            </button>
            <button
              className="memory-arrow memory-arrow-left"
              type="button"
              onClick={() => movePhoto(-1)}
              aria-label="Foto anterior"
            >
              ‹
            </button>
            <img
              src={`${import.meta.env.BASE_URL}fotos/recuerdos/${selectedPhoto}`}
              alt={`Recuerdo juntos ${selectedIndex + 1}`}
            />
            <button
              className="memory-arrow memory-arrow-right"
              type="button"
              onClick={() => movePhoto(1)}
              aria-label="Foto siguiente"
            >
              ›
            </button>
            <p>{captions[selectedIndex]}</p>
            <span className="memory-counter">
              {String(selectedIndex + 1).padStart(2, '0')} / {String(memories.length).padStart(2, '0')}
            </span>
          </section>
        </div>
      )}
    </section>
  )
}

export default MemoriesGallery
