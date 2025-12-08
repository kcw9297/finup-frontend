import { useState, useRef, useEffect } from "react";

// 공지사항 훅
export function useHomeNotice(noticeList, delay = 4000) {
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);
  const intervalRef = useRef(null)

  // 자동 슬라이드 타이머 초기화
  const resetInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      showNext(false); // 자동 이동 시 resetInterval 호출 방지
    }, delay);
  };

  // 다음 공지로 이동
  const showNext = (shouldReset = true) => {
    setFade(false); // 페이드아웃

    setTimeout(() => {
      setCurrent((prev) => (prev + 1) % noticeList.length);
      setFade(true); // 페이드인

      if (shouldReset) resetInterval(); // 수동 이동이면 타이머 리셋
    }, 400);
  };

  // 최초 실행 + 언마운트 클린업
  useEffect(() => {
    resetInterval();
    return () => clearInterval(intervalRef.current);
  }, []);

  return { current, fade, showNext };
}