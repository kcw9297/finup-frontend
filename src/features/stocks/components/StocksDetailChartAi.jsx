import { Box, Chip, Paper, Typography } from "@mui/material";

export default function StocksDetailChartAi({ai}){
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>

      {/* 📝 종합 요약 */}
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
          label="종합 요약"
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
          {ai.summary}
        </Typography>
      </Paper>

      {/* 📈 추세 분석 */}
      <Paper
        elevation={0}
        sx={{
          p: 2,
          border: "1px solid #e0e0e0",
          borderRadius: 2,
          background: "#fff",
        }}
      >
        <Chip label="추세 분석" color="primary" variant="outlined" sx={{ mb: 1 }} />
        <Typography sx={{ color: "text.secondary", lineHeight: 1.6 }}>
          {ai.trend}
        </Typography>
      </Paper>

      {/* 🎢 변동성 분석 */}
      <Paper
        elevation={0}
        sx={{
          p: 2,
          border: "1px solid #e0e0e0",
          borderRadius: 2,
          background: "#fff",
        }}
      >
        <Chip label="변동성" color="warning" variant="outlined" sx={{ mb: 1 }} />
        <Typography sx={{ color: "text.secondary", lineHeight: 1.6 }}>
          {ai.volatility}
        </Typography>
      </Paper>

      {/* 🔍 거래량 해석 */}
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
          label="거래량 해석"
          color="success"
          variant="outlined"
          sx={{ mb: 1 }}
        />
        <Typography sx={{ color: "text.secondary", lineHeight: 1.6 }}>
          {ai.volumeAnalysis}
        </Typography>
      </Paper>
    </Box>
  );
}