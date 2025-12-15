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
        width: "180px",
        padding: "8px 0 0 0",
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
        마이페이지
      </Typography>

      {/* 메뉴 영역 */}
      <Stack spacing={0.5}>
        {/* 활성화된 메뉴 */}
        <Button
          sx={{
            justifyContent: "flex-start",
            fontSize: "14px",
            padding: "6px 12px",
            borderRadius: "4px",
            backgroundColor: "#CEDCFF57",
            color: "#000",
            fontWeight: 500,
            "&:hover": {
              backgroundColor: "#CEDCFF57",
            },
          }}
        >
          정보 수정
        </Button>

        <Button
          sx={{
            justifyContent: "flex-start",
            fontSize: "14px",
            padding: "6px 12px",
            borderRadius: "4px",
            color: "#333",
            "&:hover": {
              backgroundColor: "rgba(0,0,0,0.03)",
            },
          }}
        >
          단어장
        </Button>

        <Button
          sx={{
            justifyContent: "flex-start",
            fontSize: "14px",
            padding: "6px 12px",
            borderRadius: "4px",
            color: "#333",
            "&:hover": {
              backgroundColor: "rgba(0,0,0,0.03)",
            },
          }}
        >
          뉴스
        </Button>
      </Stack>
    </Box>
  );
}
