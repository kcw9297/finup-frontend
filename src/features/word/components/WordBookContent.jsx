import { Box, Typography, TextField, IconButton, Stack, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function WordBookContent() {
  return (
    <Box sx={{ width: "100%" }}>

      {/* 타이틀 */}
      <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
        내 단어장
      </Typography>

      {/* 검색바 */}
      {/*
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 3,
        }}
      >
        <TextField
          placeholder="단어 검색하기"
          size="small"
          fullWidth
          sx={{
            "& .MuiOutlinedInput-root": {
              height: 40,
              borderRadius: "10px",
            },
          }}
        />
        <IconButton
          sx={{
            ml: 1,
            width: 40,
            height: 40,
            bgcolor: "#003FBF",
            borderRadius: "10px",
            "&:hover": { bgcolor: "#0033A3" },
          }}
        >
          <SearchIcon sx={{ color: "#fff" }} />
        </IconButton>
      </Box>
      */}

      {/* 단어 리스트 */}
      <Stack spacing={2}>
        {[1, 2, 3].map((v) => (
          <Paper
            key={v}
            sx={{
              p: 2,
              borderRadius: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box>
              <Typography fontWeight={600}>선물거래</Typography>
              <Typography variant="body2" color="text.secondary">
                미래 일정 시점에 미리 정한 가격 ~
              </Typography>
            </Box>

            <Typography
              sx={{
                color: "#888",
                cursor: "pointer",
                "&:hover": { color: "#555" },
              }}
            >
              삭제
            </Typography>
          </Paper>
        ))}
      </Stack>
    </Box>
  );
}
