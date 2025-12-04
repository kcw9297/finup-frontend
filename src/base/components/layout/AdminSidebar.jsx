import { Box, Stack, Typography, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

export default function AdminSidebar() {

  const location = useLocation()
  const navigate = useNavigate()


  // [*] 메뉴 정의
  const menus = [
    { label: "회원 목록 조회", path: "/admin/members" },
    { label: "공지사항 관리", path: "/admin/notices" },
    { label: "유튜브 영상 관리", path: "/admin/youtube" },
    { label: "개념 학습 관리", path: "/admin/words" },
  ];


  return (
    <Box
      sx={{
        textAlign: "left",
        width: "180px",           // 사이드바 폭
        padding: "8px 0 0 0",     // 위쪽 패딩
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* 제목 */}
      <Typography
        sx={{
          fontSize: "14px",
          fontWeight: 600,
          color: "#555",
          paddingLeft: "8px",
          marginBottom: "12px",
        }}
      >
        관리자 페이지
      </Typography>

      {/* 메뉴 영역 */}
      <Stack spacing={0.5}>
        {menus.map(menu => {
          // [1] 현재 URL과 메뉴 path 비교 -> active ㅏㄴ단
          const isActive = location.pathname.startsWith(menu.path)

          return (
            <Button
              key={menu.path}
              onClick={() => navigate(menu.path)}
              sx={{
                justifyContent: "flex-start",
                fontSize: "14px",
                padding: "6px 12px",
                borderRadius: "4px",
                fontWeight: isActive ? 600 : 400,
                backgroundColor: isActive ? "rgba(25, 118, 210, 0.08)" : "transparent",
                color: isActive ? "#1976d2" : "#333",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.04)",
                },
              }}
            >
              {menu.label}
            </Button>
          )
        })}
      </Stack>
    </Box>
  );
}
