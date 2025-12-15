import { Box, Stack, Typography, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

export default function MypageSidebar() {

  const navigate = useNavigate();
  const location = useLocation();

  const menus = [
    { label: "정보 수정", path: "/mypage" },
    { label: "단어장", path: "/mypage/words" },
    { label: "뉴스", path: "/mypage/news" },
  ];

  const isActive = (path) => {
    // /mypage는 정확히 일치할 때만 활성
    if (path === "/mypage") return location.pathname === "/mypage";
    // 나머지는 하위 경로 포함해서 활성
    return location.pathname.startsWith(path);
  };

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
          fontSize: "22px",
          fontWeight: 800,
          color: "#555",
          paddingLeft: "8px",
          marginBottom: "30px",
        }}
      >
        마이페이지
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
                fontSize: "15px",
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
  )
}
