// SidebarLayout.jsx
import { Box } from "@mui/material";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useLoginMember } from "../hooks/useLoginMember";
import Loading from "../components/layout/Loading";

export default function SidebarLayout({ 
  allowedAnonymous = false,
  allowedRoles = null,
  sidebar, 
  sidebarPosition = "left",
  maxWidth = 1440,
  sidebarWidth = 240
}) {

  
  // [1] 사용 Hook
  const { isAuthenticated, loginMember, loading } = useLoginMember() // 로그인 상태

  // 만약 로딩 중이면, 로딩 페이지 렌더링
  if (loading) return (<Loading />)

  // 만약 권한이 없는 경우 혹은 로그인이 필요한 경우
  if (!isAuthenticated && !allowedAnonymous) {
    const currentPath = location.pathname + location.search
    const loginUrl = `/login?returnUrl=${encodeURIComponent(currentPath)}`
    return <Navigate to={loginUrl} state={{ message: "로그인이 필요한 서비스입니다." }} replace />
  }

  // 만약 허용할 role을 설정한 경우 (null 이 아닌 경우) 권한 검증
  if (allowedRoles && !allowedRoles.includes(loginMember?.role))
    return <Navigate to="/" replace />


  return (
    <Box
      sx={{
        maxWidth,
        width: "100%",
        mx: "auto",
        display: "flex",
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: "flex-start",
        gap: 4,
        pt: 4,
        pb: 4,
      }}
    >
      {/* 왼쪽 사이드바 */}
      {sidebarPosition === "left" && (
        <Box sx={{ 
          p: 2,
          width: { xs: '100%', md: sidebarWidth },
          flexShrink: 0,
          display: { xs: 'none', md: 'block' }
        }}>
          {sidebar}
        </Box>
      )}

      {/* 메인 콘텐츠 */}
      <Box sx={{ flex: 1, width: '100%' }}>
        <Outlet />
      </Box>

      {/* 오른쪽 사이드바 */}
      {sidebarPosition === "right" && (
        <Box sx={{ 
          width: { xs: '100%', md: sidebarWidth },
          flexShrink: 0,
          display: { xs: 'none', lg: 'block' },
          order: { xs: -1, lg: 0 }
        }}>
          {sidebar}
        </Box>
      )}
    </Box>
  );
}