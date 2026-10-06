import { useCallback, useEffect, useRef, useState } from 'react'

const API_URL = 'https://www.youtube.com/iframe_api'
let youtubeApiPromise

function loadYouTubeApi() {
  if (typeof window === 'undefined') return Promise.reject(new Error('YouTube API requires a browser'))
  if (window.YT?.Player) return Promise.resolve(window.YT)
  if (youtubeApiPromise) return youtubeApiPromise

  youtubeApiPromise = new Promise((resolve, reject) => {
    const previousReadyHandler = window.onYouTubeIframeAPIReady
    window.onYouTubeIframeAPIReady = () => {
      if (typeof previousReadyHandler === 'function') previousReadyHandler()
      resolve(window.YT)
    }

    const existingScript = document.querySelector(`script[src="${API_URL}"]`)
    if (existingScript) {
      existingScript.addEventListener('error', () => reject(new Error('YouTube API failed to load')), { once: true })
      return
    }

    const script = document.createElement('script')
    script.src = API_URL
    script.async = true
    script.addEventListener('error', () => reject(new Error('YouTube API failed to load')), { once: true })
    document.head.appendChild(script)
  })

  return youtubeApiPromise
}

export default function useAudioPlayer() {
  const playerElementRef = useRef(null)
  const playerRef = useRef(null)
  const currentSongRef = useRef(null)
  const positionsRef = useRef({})
  const pendingSongRef = useRef(null)
  const volumeRef = useRef(75)
  const [ready, setReady] = useState(false)
  const [apiError, setApiError] = useState(false)
  const [currentSong, setCurrentSong] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [durations, setDurations] = useState({})
  const [errors, setErrors] = useState({})
  const [volume, setVolumeState] = useState(75)

  const syncTime = useCallback(() => {
    const player = playerRef.current
    const song = currentSongRef.current
    if (!player || !song || typeof player.getCurrentTime !== 'function') return
    const nextTime = Number(player.getCurrentTime()) || 0
    const nextDuration = Number(player.getDuration()) || 0
    positionsRef.current[song.id] = nextTime
    setCurrentTime(nextTime)
    setDuration(nextDuration)
    if (nextDuration > 0) {
      setDurations((current) => current[song.id] === nextDuration ? current : { ...current, [song.id]: nextDuration })
    }
  }, [])

  const loadAndPlay = useCallback((song) => {
    const player = playerRef.current
    if (!player || !song?.youtubeId) return
    const startSeconds = positionsRef.current[song.id] ?? song.startAt ?? 0
    player.loadVideoById({ videoId: song.youtubeId, startSeconds })
  }, [])

  useEffect(() => {
    let cancelled = false

    loadYouTubeApi()
      .then((YT) => {
        if (cancelled || !playerElementRef.current) return
        playerRef.current = new YT.Player(playerElementRef.current, {
          width: 360,
          height: 203,
          host: 'https://www.youtube-nocookie.com',
          playerVars: {
            autoplay: 0,
            controls: 1,
            playsinline: 1,
            rel: 0,
          },
          events: {
            onReady: (event) => {
              event.target.setVolume(volumeRef.current)
              setReady(true)
              if (pendingSongRef.current) {
                const pendingSong = pendingSongRef.current
                pendingSongRef.current = null
                loadAndPlay(pendingSong)
              }
            },
            onStateChange: (event) => {
              if (event.data === YT.PlayerState.PLAYING) {
                setIsPlaying(true)
                setHasStarted(true)
                syncTime()
              } else if (event.data === YT.PlayerState.PAUSED) {
                setIsPlaying(false)
                syncTime()
              } else if (event.data === YT.PlayerState.ENDED) {
                setIsPlaying(false)
                syncTime()
              }
            },
            onError: () => {
              const song = currentSongRef.current
              if (song) setErrors((current) => ({ ...current, [song.id]: true }))
              setIsPlaying(false)
            },
            onAutoplayBlocked: () => setIsPlaying(false),
          },
        })
      })
      .catch(() => {
        if (!cancelled) setApiError(true)
      })

    return () => {
      cancelled = true
      if (playerRef.current?.destroy) playerRef.current.destroy()
      playerRef.current = null
    }
  }, [loadAndPlay, syncTime])

  useEffect(() => {
    if (!isPlaying) return undefined
    const timer = window.setInterval(syncTime, 750)
    return () => window.clearInterval(timer)
  }, [isPlaying, syncTime])

  const toggleSong = useCallback((song) => {
    if (!song.youtubeId || apiError) {
      setErrors((current) => ({ ...current, [song.id]: true }))
      return
    }

    setErrors((current) => ({ ...current, [song.id]: false }))

    const player = playerRef.current
    if (currentSongRef.current?.id === song.id) {
      if (!ready || !player) return
      if (isPlaying) player.pauseVideo()
      else player.playVideo()
      return
    }

    if (currentSongRef.current && player?.getCurrentTime) {
      positionsRef.current[currentSongRef.current.id] = Number(player.getCurrentTime()) || 0
    }
    currentSongRef.current = song
    setCurrentSong(song)
    setCurrentTime(positionsRef.current[song.id] ?? song.startAt ?? 0)
    setDuration(durations[song.id] || 0)
    setHasStarted(false)
    setIsPlaying(false)

    if (ready && player) loadAndPlay(song)
    else pendingSongRef.current = song
  }, [apiError, durations, isPlaying, loadAndPlay, ready])

  const seek = useCallback((value) => {
    const next = Number(value)
    if (!playerRef.current?.seekTo || !Number.isFinite(next)) return
    playerRef.current.seekTo(next, true)
    setCurrentTime(next)
    if (currentSongRef.current) positionsRef.current[currentSongRef.current.id] = next
  }, [])

  const setVolume = useCallback((value) => {
    const next = Math.min(100, Math.max(0, Number(value)))
    volumeRef.current = next
    setVolumeState(next)
    if (playerRef.current?.setVolume) playerRef.current.setVolume(next)
  }, [])

  return {
    apiError,
    currentSong,
    currentTime,
    duration,
    durations,
    errors,
    hasStarted,
    isPlaying,
    playerElementRef,
    ready,
    seek,
    setVolume,
    toggleSong,
    volume,
  }
}
