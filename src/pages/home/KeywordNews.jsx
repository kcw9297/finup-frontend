import { Box, Paper, Typography } from "@mui/material";
import { useState, useMemo } from "react";
import KeywordSection from "./KeywordSection";
import KeywordContent from "./KeywordContent";

// 핵심 키워드 + 뉴스 원문
// 워드클라우드는 전역테마 적용 불가

export default function KeywordNews() {
  // 뉴스 리스트 가짜 데이터
  const fakeNews = [
    {title: "코레일유통, 철도역 추석 맞아 각종 이벤트 진행",
      date: "2025.10.01",
      logo: "/press/munhwa.png"},
    {title: "K메모리 글로벌 위상 입증… 아·태 AI 허브 도약 기대",
      date: "2025.10.01",
      logo: "/press/seoul.png"},
    {title: "韓 수출 호조세 지속… 반도체 시장 회복 조짐",
      date: "2025.10.02",
      logo: "/press/hankyung.png"},
    {title: "정부, 내년도 경제정책방향 발표 ‘성장·복지 강화’",
      date: "2025.10.03",
      logo: "/press/joongang.png"},
    {title: "환율 변동성 확대… 금융시장 불안감 고조",
      date: "2025.10.03",
      logo: "/press/ytn.png"},
      {title: "환율 변동성 확대… 금융시장 불안감 고조",
      date: "2025.10.03",
      logo: "/press/ytn.png"},
  ]

  // 긍/부정 필터
  const [showPositive, setShowPositive] = useState(true);
  const [showNegative, setShowNegative] = useState(true);

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