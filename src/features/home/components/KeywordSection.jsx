import { Box, Checkbox, FormControlLabel } from "@mui/material";
import WordCloud from "./WordCloud";

// 핵심 키워드

export default function KeywordSection({
  originalKeywords,     // 뉴스 키워드 원본
  filteredKeywords,     // 필터 적용된 목록 (색·보임용)
  showPositive,
  showNegative,
  setShowPositive,
  setShowNegative,
}) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 5}}>
      {/* 체크박스 */}
      <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={showPositive}
              onChange={(e) => setShowPositive(e.target.checked)}
              sx={{
                color: "#3182F6",
                "&.Mui-checked": {
                  color: "#3182F6",
                },
              }}
            />
          }
          label="긍정"
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={showNegative}
              onChange={(e) => setShowNegative(e.target.checked)}
              sx={{
                color: "#F04452",
                "&.Mui-checked": {
                  color: "#F04452",
                },
              }}
            />
          }
          label="부정"
        />
      </Box>

      {/* 워드클라우드 */}
      <WordCloud
        originalWords={originalKeywords}   // 위치 계산 기준
        displayWords={filteredKeywords}    // 색상/필터 적용
      />
    </Box>
  );
}