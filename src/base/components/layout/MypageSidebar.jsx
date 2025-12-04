import { Box, Stack, Typography, Button } from "@mui/material";

export default function MypageSidebar() {
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
            backgroundColor: "#CEDCFF57", // ✔ 요청한 색상 적용
            color: "#000",
            fontWeight: 500,
            "&:hover": {
              backgroundColor: "#CEDCFF57", // hover 시 색 유지
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
