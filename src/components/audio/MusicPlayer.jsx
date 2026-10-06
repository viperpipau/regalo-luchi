import { songs } from '../../data/songs'
import useAudioPlayer from '../../hooks/useAudioPlayer'
import './MusicPlayer.css'

function formatTime(value) {
  if (!Number.isFinite(value) || value < 0) return '--:--'
  const minutes = Math.floor(value / 60)
  const seconds = Math.floor(value % 60)
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

export default function MusicPlayer() {
  const player = useAudioPlayer()

  return (
    <section className="module playlist local-music" id="musica">
      <div className="playlist-title">
        <span>♡ REGISTROS DE AUDIO</span>
        <h2>Canciones para vos</h2>
        <p>Porque algunas personas también se recuerdan con música.</p>
      </div>

      <div className={player.currentSong ? 'youtube-player-shell has-song' : 'youtube-player-shell'}>
        <div ref={player.playerElementRef} />
      </div>

      {player.apiError && (
        <div className="audio-api-error" role="status">
          <strong>REPRODUCTOR NO DISPONIBLE</strong>
          <span>Podés abrir cualquiera de los registros directamente en YouTube.</span>
        </div>
      )}

      <div className="songs">
        {songs.map((song, index) => {
          const active = player.currentSong?.id === song.id
          const unavailable = !song.youtubeId || player.errors[song.id]
          const trackDuration = active ? player.duration : player.durations[song.id]
          return (
            <article className={active ? 'song local-song is-active' : 'song local-song'} key={song.id}>
              <div className="song-number">{String(index + 1).padStart(2, '0')}</div>
              <div className="album" aria-hidden="true">{song.icon || '♫'}</div>
              <div className="song-info">
                <strong>{song.title}</strong>
                <small>{song.artist}</small>
                {active && !unavailable && (
                  <div className="track-timeline">
                    <input
                      type="range"
                      min="0"
                      max={player.duration || 0}
                      step="0.1"
                      value={player.currentTime}
                      onChange={(event) => player.seek(event.target.value)}
                      aria-label={`Progreso de ${song.title}`}
                      disabled={!player.duration}
                    />
                    <span>{formatTime(player.currentTime)} / {formatTime(trackDuration)}</span>
                  </div>
                )}
                {!active && <span className="track-duration">{formatTime(trackDuration)}</span>}
              </div>
              <button
                type="button"
                className="play"
                onClick={() => player.toggleSong(song)}
                aria-label={`${active && player.isPlaying ? 'Pausar' : 'Reproducir'} ${song.title}`}
                disabled={!song.youtubeId}
              >
                {active && player.isPlaying ? '⏸' : '▶'}
              </button>
              {song.youtubeId && (
                <a className="youtube-link" href={`https://www.youtube.com/watch?v=${song.youtubeId}`} target="_blank" rel="noopener noreferrer">
                  VER EN YOUTUBE
                </a>
              )}
              {unavailable && (
                <div className="audio-error" role="status">
                  <strong>REGISTRO DE AUDIO NO DISPONIBLE</strong>
                  <span>Este registro no pudo reproducirse.</span>
                </div>
              )}
              {active && player.hasStarted && !unavailable && song.message && (
                <div className="song-note">
                  <b>NOTA DEL EXPEDIENTE</b>
                  <span>{song.message}</span>
                </div>
              )}
            </article>
          )
        })}
      </div>

      {player.currentSong && !player.errors[player.currentSong.id] && (
        <div className="persistent-audio" aria-live="polite">
          <span>{player.isPlaying ? 'REPRODUCIENDO' : 'REGISTRO EN PAUSA'}: <b>{player.currentSong.title}</b></span>
          <button type="button" onClick={() => player.toggleSong(player.currentSong)} aria-label="Alternar reproducción">
            {player.isPlaying ? '⏸' : '▶'}
          </button>
          <label>
            <span>VOLUMEN</span>
            <input type="range" min="0" max="100" step="5" value={player.volume} onChange={(event) => player.setVolume(event.target.value)} aria-label="Volumen del reproductor" />
          </label>
        </div>
      )}
    </section>
  )
}
