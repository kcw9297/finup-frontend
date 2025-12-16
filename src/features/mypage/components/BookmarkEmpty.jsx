import { Box, Typography } from "@mui/material";

export default function BookmarkEmpty() {
  return (
    <Box
      sx={{
        py: 10,
        textAlign: 'center',
        color: 'text.secondary',
      }}
    >
      <Typography sx={{ fontWeight: 600, mb: 1 }}>
        북마크한 개념 학습이 없습니다
      </Typography>
      <Typography variant="body2">
        관심 있는 개념을 북마크해두고 나중에 다시 학습해보세요 🙂
      </Typography>
    </Box>
  );
}
