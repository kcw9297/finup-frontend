import { Box, Stack, Typography, Button } from "@mui/material";

export default function AdminSidebar() {
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
        {/* 활성화된 메뉴 스타일 */}
        <Button
          sx={{
            justifyContent: "flex-start",
            fontSize: "14px",
            padding: "6px 12px",
            borderRadius: "4px",
            backgroundColor: "rgba(0, 0, 0, 0.05)",   // 선택된 메뉴 효과 (연한 회색)
            color: "#1976d2",
            fontWeight: 500,
          }}
        >
          회원 목록 조회
        </Button>

        <Button
          sx={{
            justifyContent: "flex-start",
            fontSize: "14px",
            padding: "6px 12px",
            borderRadius: "4px",
            color: "#333",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.04)",
            },
          }}
        >
          공지사항 관리
        </Button>

        <Button
          sx={{
            justifyContent: "flex-start",
            fontSize: "14px",
            padding: "6px 12px",
            borderRadius: "4px",
            color: "#333",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.04)",
            },
          }}
        >
          유튜브 영상 관리
        </Button>
        <Button
          sx={{
            justifyContent: "flex-start",
            fontSize: "14px",
            padding: "6px 12px",
            borderRadius: "4px",
            color: "#333",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.04)",
            },
          }}
        >
          개념 학습 관리
        </Button>
      </Stack>
    </Box>
  );
}
