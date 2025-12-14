import { Navigate, useLocation } from "react-router-dom";
import Loading from '../components/layout/Loading'
import { useAuth } from "../hooks/useAuth";

/**
 * 인증 및 권한 확인이 필요한 컴포넌트 라우팅 
 * @author kcw
 * @since 2025-11-27
 * @param allowedRoles 허용 Role (기본 : null)
 */

export default function ProtectedRoute({ children, allowedRoles = null }) {

  // [1] 사용 Hook
  const { isAuthenticated, loginMember, loading } = useAuth() // 로그인 상태
  const location = useLocation() // 현재 경로

  // 만약 로딩 중이면, 로딩 페이지 렌더링
  if (loading) return (<Loading />)

  // [2] 미인증(비로그인) 회원 - URL을 /login으로 변경하면서 현재 경로 저장
  // 이동한 페이지에서, location.state 으로 확인 가능 (돌아갈 페이지 정보 전달)
  if (!isAuthenticated) {
    const currentPath = location.pathname + location.search
    const loginUrl = `/login?returnUrl=${encodeURIComponent(currentPath)}`
    return <Navigate to={loginUrl} replace />
  }

  // [3] 권한 인증 
  // 만약 허용할 role을 설정한 경우 (null 이 아닌 경우) 권한 검증
  if (allowedRoles && !allowedRoles.includes(loginMember?.role))
    return <Navigate to="/forbidden" replace />

  // [4] 위 권한 인증을 모두 통과한 경우, 자식 컴포넌트를 그대로 반환
  return children
}