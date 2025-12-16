import { Box, Paper, Typography } from "@mui/material";
import WordCloud from "./WordCloud";
import KeywordContent from "./KeywordContent";

// 워드 클라우드 + 뉴스 리스트
export default function KeywordNews({ newsList, originalKeywords, onItemClick }) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {/* 제목 */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "20px",
          "& .MuiTypography-root": { fontSize: 22, fontWeight: 600 },
        }}
      >
        <Paper sx={{ display: "flex", gap: "10px" }}>
          <Typography sx={{ color: "base.main", backgroundColor: "base.main" }}>
            &nbsp;
          </Typography>
          <Typography>개념 키워드</Typography>
        </Paper>

        <Paper sx={{ display: "flex", gap: "10px" }}>
          <Typography sx={{ color: "base.main", backgroundColor: "base.main" }}>
            &nbsp;
          </Typography>
          <Typography>기사 원문</Typography>
        </Paper>
      </Box>

      {/* 본문 */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "20px",
        }}
      >
        {/* 워드클라우드 */}
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <WordCloud
            originalWords={originalKeywords}
            displayWords={originalKeywords}
          />
        </Box>

        {/* 기사 리스트 */}
        <Box sx={{ width: "100%" }}>
          <KeywordContent list={newsList} onItemClick={onItemClick} />
        </Box>
      </Box>
    </Box>
  );
}