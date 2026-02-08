import { Box, Chip, Paper, Typography } from "@mui/material";

export default function StocksDetailChartAi({ai}){
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, mt: 1.5 }}>

      {/* 최근 추세 분석 */}
      <Paper
        elevation={0}
        sx={{
          p: 2,
          border: "1px solid #e0e0e0",
          borderRadius: 2,
          background: "#fff",
        }}
      >
        <Chip
          label="최근 추세"
          color="secondary"
          variant="outlined"
          sx={{ mb: 1 }}
        />
        <Typography
          sx={{
            color: "text.primary",
            fontSize: "1.05rem",
            lineHeight: 1.6,
          }}
        >
          {ai.recentTrend}
        </Typography>
      </Paper>

      {/* 이전과의 차이 분석 */}
      <Paper
        elevation={0}
        sx={{
          p: 2,
          border: "1px solid #e0e0e0",
          borderRadius: 2,
          background: "#fff",
        }}
      >
        <Chip label="이전과의 차이" color="primary" variant="outlined" sx={{ mb: 1 }} />
        <Typography sx={{ color: "text.secondary", lineHeight: 1.6 }}>
          {ai.comparisonWithPast}
        </Typography>
      </Paper>

      {/* 투자 포인트 분석 */}
      <Paper
        elevation={0}
        sx={{
          p: 2,
          border: "1px solid #e0e0e0",
          borderRadius: 2,
          background: "#fff",
        }}
      >
        <Chip label="투자 포인트" color="warning" variant="outlined" sx={{ mb: 1 }} />
        <Typography sx={{ color: "text.secondary", lineHeight: 1.6 }}>
          {ai.investorNote}
        </Typography>
      </Paper>

    </Box>
  );
}