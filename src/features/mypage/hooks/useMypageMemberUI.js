import { useEffect, useRef, useState } from "react";

/**
 * 마이페이지 회원 정보 UI 전용 훅
 * - 모달 상태
 * - hover 처리
 */
export function useMypageMemberUI() {

  // 모달 상태
  const [openNickname, setOpenNickname] = useState(false);
  const [openPassword, setOpenPassword] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);

  // hover 타이머
  const hoverTimerRef = useRef(null);

  // 언마운트 시 타이머 정리
  useEffect(() => {
    return () => {
      if (hoverTimerRef.current) {
        clearTimeout(hoverTimerRef.current);
        hoverTimerRef.current = null;
      }
    };
  }, []);

  // hover 이벤트
  const handleProfileMouseEnter = () => {
    if (openProfile) return;

    hoverTimerRef.current = setTimeout(() => {
      setOpenProfile(true);
    }, 200);
  };

  const handleProfileMouseLeave = () => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
  };

  return {
    // modal state
    openNickname,
    setOpenNickname,
    openPassword,
    setOpenPassword,
    openProfile,
    setOpenProfile,

    // hover
    handleProfileMouseEnter,
    handleProfileMouseLeave,
  };
}
