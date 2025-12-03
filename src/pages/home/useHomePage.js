import { useState, useRef, useEffect } from "react"

// 홈 - 공지사항 이동 js

export function useHomePage (noticeList, delay = 4000) {
  const [noticeCurrent, setNoticeCurrent] = useState(0)
  const [fade, setFade] = useState(true)
  const intervalRef = useRef(null)

  // intervalRef 초기화 (인위적으로 공지 넘기면 자동 이동 타이머 리셋)
  const resetInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
      intervalRef.current = setInterval(() => {
      showNext(false);
    }, delay);
  };

  // 다음 공지로 이동
  const showNext = (reset = true) => {
    setFade(false)
    setTimeout(() => {
      setNoticeCurrent((prev) => (prev + 1) % noticeList.length)
      setFade(true)
      if (reset) resetInterval()
    }, 400)
  }

  useEffect(() => {
    resetInterval()
    return () => clearInterval(intervalRef.current)
  }, [])

  return { noticeCurrent, fade, showNext }
}