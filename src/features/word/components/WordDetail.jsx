import { Box, Typography, Divider, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const MOCK_WORD_DETAIL = {
  title: '선물거래',
  category: '금융',
  pathLabel: '스크랩하기',
  content: `
선물(futures)거래란 장래 일정 시점에 미리 정한 가격으로 매매할 것을 현재 시점에서 약정하는 거래로, 미래의 가치를 사고 파는 것이다. 선물의 가치가 현물시장에 운용되는 기초자산(채권, 외환, 주식 등)의 가격 변동에 의해 파생적으로 결정되는 파생상품(derivatives) 거래의 일종이다. 미리 정한 가격으로 매매를 약속한 것이기 때문에 가격변동 위험의 회피가 가능하다는 특징이 있다.

위험회피를 목적으로 출발했으나, 고도의 첨단금융기법을 이용, 위험을 능동적으로 받아들임으로써 오히려 고수익·고위험 투자상품으로 발전했다. 우리나라로는 1996년 5월 주가지수 선물시장을 개설한 데 이어 1999년 4월 23일 선물거래소가 부산에서 개장되었다. 1848년에 미국의 시카고에서 82명의 회원으로 시작된 세계 최초의 선물거래소인 시카고상품거래소(CBOT; Chicago Board of Trade)가 설립되어, 곡물, 콩, 옥수수 등의 주요 농산물에 대해 선물계약을 거래하기 시작했다.

이때 거래되는 농산물은 당시 세계 농산물 거래량의 80%를 차지할 정도였다. 60년대 이후 세계경제환경이 급변하면서 금융분야들에 대한 효율적인 관리수단의 필요성이 제기되어 70년대 금융선물이 등장했다. 72년 미국의 시카고상업거래소(CME; Chicago Mercantile Exchange)에서 밀턴 프리드먼 등 경제학자들의 자문을 통해 통화선물이 도입되었다. 그 후 73년에 개별주식옵션, 76년에 채권선물 등 각종 선물관련 금융상품이 개발되기 시작했다.
  `,
  aiSummary:
    '선물거래는 미래 가격을 미리 정해 약속하는 거래로, 원래는 위험을 줄이는 목적이었지만 지금은 고위험·고수익 투자 방식으로도 사용된다.',
};

export default function WordDetailPage() {
  const navigate = useNavigate();
  const data = MOCK_WORD_DETAIL;

  return (
    <Box sx={{ width: '100%', minHeight: '100%', py: 4 }}>
      {/* 메인 컨테이너 */}
      <Box
        sx={{
          maxWidth: 940,     // ★★★ 폭 줄임
          mx: 'auto',
          mt: 4,             // ★ 여백 줄여 전체 높이 축소
          mb: 6,
        }}
      >
        {/* ========== 상단 영역 ========== */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              mb: 1,
              textAlign: 'left'     // ★★★ 왼쪽 정렬
            }}
          >
            {data.title}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              textAlign: 'left'      // ★ 왼쪽 정렬
            }}
          >
            {data.category} | {data.pathLabel}
          </Typography>
        </Box>

        <Divider sx={{ mb: 4 }} />

        {/* ========== 본문 내용 ========== */}
        <Box sx={{ mb: 6 }}>
          <Typography
            variant="body1"
            sx={{
              whiteSpace: 'pre-line',
              lineHeight: 1.8,
              textAlign: 'left',   // ★ 본문도 왼쪽 정렬
            }}
          >
            {data.content}
          </Typography>
        </Box>

        {/* ========== AI 요약 ========== */}
        <Box sx={{ mb: 8 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              mb: 2,
              textAlign: 'left'     // ★ 왼쪽 정렬
            }}
          >
            AI요약
          </Typography>

          <Typography
            variant="body1"
            sx={{
              lineHeight: 1.8,
              textAlign: 'left'     // ★ 왼쪽 정렬
            }}
          >
            {data.aiSummary}
          </Typography>
        </Box>

        {/* ========== 목록 버튼 ========== */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
          <Button
            variant="outlined"
            sx={{
              minWidth: 120,
              px: 4,
              borderRadius: '10px',
            }}
            onClick={() => navigate('/words/search')}
          >
            목록
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
