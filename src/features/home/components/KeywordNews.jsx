import { Box, Paper, Typography } from "@mui/material";
import KeywordSection from "./KeywordSection";
import KeywordContent from "./KeywordContent";

// 핵심 키워드 + 뉴스 원문
// 워드클라우드는 전역테마 적용 불가

export default function KeywordNews({
  fakeNews,
  originalKeywords,
  filteredKeywords,
  showPositive,
  showNegative,
  setShowPositive,
  setShowNegative
}) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>

      {/* 제목 */}
      <Box
        sx={{display:'grid', gridTemplateColumns:'repeat(2, 1fr)', gap:'20px',
          "& .MuiTypography-root": { fontSize: 22, fontWeight: 600 }
        }}
      >
        <Paper sx={{ display: 'flex', gap: '10px' }}>
          <Typography sx={{ color: 'base.main', backgroundColor: 'base.main' }}>&nbsp;</Typography>
          <Typography>핵심 키워드</Typography>
        </Paper>
        <Paper sx={{ display: 'flex', gap: '10px'}}>
          <Typography sx={{ color: 'base.main', backgroundColor: 'base.main' }}>&nbsp;</Typography>
          <Typography>기사 원문</Typography>
        </Paper>
      </Box>

      {/* 본문 */}
      <Box sx={{display:'grid', gridTemplateColumns:'repeat(2, 1fr)', gap:'20px'}}>
        
        {/* 핵심 키워드 */}
        <KeywordSection
          originalKeywords={originalKeywords}   // 뉴스 갱신 시에만 바뀌는 데이터
          filteredKeywords={filteredKeywords}   // 필터용 데이터 (워드클라우드 위치는 불변)
          showPositive={showPositive}
          showNegative={showNegative}
          setShowPositive={setShowPositive}
          setShowNegative={setShowNegative}
        />

        {/* 기사 본문 */}
        <Box sx={{ width: "100%" }}>
          <KeywordContent list={fakeNews} />
        </Box>
      </Box>

    </Box>
  );
}