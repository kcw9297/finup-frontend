import { Navigate } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";

/**
 * 비회원 사용자만 접근을 허용하기 위한 라우팅 컴포넌트
 * @author kcw
 * @since 2025-11-27
 */
export default function GuestRoute({ children }) {
  
  // [1] 전역 로그인 상태
  const { isAuthenticated } = useAuthStore()

  // [2] 로그인 사용자는, 홈으로 리다이렉트 수행
  if (isAuthenticated) return <Navigate to="/" replace />

  // [3] 미인증 사용자는 children 컴포넌트 렌더링
  return children
}