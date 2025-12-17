import { Box, CircularProgress, Typography, Paper } from "@mui/material";

export default function QuizLoading({
  text = "문제를 불러오는 중입니다...",
  height = 220,
}) {
  return (
    <Paper
      elevation={3}
      sx={{
        height: 514,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        borderRadius: 3,
        backgroundColor: "#f5f9ff",
      }}
    >
      <CircularProgress color="primary" />
      <Typography
        sx={{
          color: "primary.main",
          fontWeight: 600,
          fontSize: 15,
        }}
      >
        {text}
      </Typography>
    </Paper>
  );
}