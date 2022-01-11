import { useEffect, useRef, useState, useCallback } from 'react'

export default function Timer() {
  const [count, setCount] = useState('0.00')
  const isCounting = useRef(false)
  const startTime = useRef(0)
  const endTime = useRef(0)
  const [time, setTime] = useState(0)
  const timer = useRef(0)

  const rafCallback = useCallback(() => {
    let currentTime = Date.now()

    let m = Math.floor((currentTime - startTime.current) / 60000)
    let s = Math.floor((currentTime - startTime.current) / 1000) % 60
    let ms = Math.floor(((currentTime - startTime.current) % 1000) / 10)
      .toString()
      .padStart(2, '0')

    setCount(
      m === 0 ? `${s}.${ms}` : `${m}:${s.toString().padStart(2, '0')}.${ms}`
    )

    timer.current = requestAnimationFrame(rafCallback)
  }, [])

  useEffect(() => {
    document.addEventListener('keydown', e => {
      if (e.key !== ' ' || e.repeat) {
        return
      }
      if (!isCounting.current) {
        startTime.current = Date.now()

        requestAnimationFrame(rafCallback)
      }

      if (isCounting.current) {
        endTime.current = Date.now()
        cancelAnimationFrame(timer.current)
      }

      isCounting.current = !isCounting.current
    })
  }, [])

  return <b className='time'>{count}</b>
}
