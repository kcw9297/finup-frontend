import { Box, Paper, Typography } from "@mui/material";
import KeywordContent from "./KeywordContent";

// 뉴스 리스트만 표시
export default function KeywordNews({ loading, newsList, onItemClick }) {

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {/* 제목 */}
      <Paper sx={{ display: "flex", gap: "10px" }}>
        <Typography 
          sx={{ 
            color: "base.main", 
            backgroundColor: "base.main",
            fontSize: 22, 
            fontWeight: 600 
          }}
        >
          &nbsp;
        </Typography>
        <Typography sx={{ fontSize: 22, fontWeight: 600 }}>
          최신 기사 목록
        </Typography>
      </Paper>

      {/* 기사 리스트 - 전체 너비 */}
      <Box sx={{ width: "100%" }}>
        <KeywordContent loading={loading} list={newsList} onItemClick={onItemClick} />
      </Box>
    </Box>
  );
}