import { Box, Paper, Typography } from "@mui/material";
import { useState, useMemo } from "react";
import KeywordSection from "./KeywordSection";

export default function KeywordNews() {
  // 긍/부정 필터
  const [showPositive, setShowPositive] = useState(true);
  const [showNegative, setShowNegative] = useState(true);

  // Fake 기사 데이터
  const fakeArticles = [
    { press: "조선일보", title: "코레일유통, 철도역 추석 맞아 이벤트 펼쳐", date: "2025.10.01" },
    { press: "세계일보", title: "KD메모리 글로벌 위상 입증… AI 허브 기대감", date: "2025.10.01" },
    { press: "KBS", title: "‘D-30’ APEC 준비 박차", date: "2025.10.01" },
    { press: "한국경제", title: "“안보 핑계 대는 악질…” 중국, 미국에 맹비난", date: "2025.10.01" },
  ];

  // 원본 데이터 (뉴스 갱신 시에만 변경)
  const [originalKeywords] = useState(() => {
    const fake = [
      { text: "성장", value: 8, sentiment: "positive" },
      { text: "혁신", value: 7, sentiment: "positive" },
      { text: "성공", value: 6, sentiment: "positive" },
      { text: "기대", value: 7, sentiment: "positive" },

      { text: "우려", value: 6, sentiment: "negative" },
      { text: "비판", value: 5, sentiment: "negative" },
      { text: "불안", value: 5, sentiment: "negative" },
      { text: "위험", value: 4, sentiment: "negative" },
      { text: "갈등", value: 4, sentiment: "negative" },
    ];

    return fake.map(w => ({
      ...w,
      color: w.sentiment === "positive" ? "#3182F6" : "#F04452",
    }));
  });

  // 필터 적용된 데이터 (UI 표시용)
  const filteredKeywords = useMemo(() => {
    return originalKeywords.filter((w) => {
      if (w.sentiment === "positive" && !showPositive) return false;
      if (w.sentiment === "negative" && !showNegative) return false;
      return true;
    });
  }, [originalKeywords, showPositive, showNegative]); // 필터 변경 시에만 재계산

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>

      {/* 제목 */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          "& .MuiTypography-root": { fontSize: 22, fontWeight: 600 }
        }}
      >
        <Paper sx={{ display: 'flex', gap: '10px' }}>
          <Typography sx={{ color: 'base.main', backgroundColor: 'base.main' }}>&nbsp;</Typography>
          <Typography>핵심 키워드</Typography>
        </Paper>
        <Paper sx={{ display: 'flex', gap: '10px', width: 690 }}>
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
        <Box></Box>
      </Box>

    </Box>
  );
}