import { Box, Button, Typography, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote'
import { Link } from 'react-router-dom';

// 종료 + 학습 단계 추천

export default function QuizResult ({ score, onClose }) {
  const getRecommendation = () => {
    if (score < 40) return "개념 학습을 추천해요!";
    if (score < 70) return "뉴스 학습을 추천해요!";
    return "종목 학습을 추천해요!";
  };

  const recommendedLink = () => {
    if (score < 40) return '/login';
    if (score < 70) return '/news/list';
    return '/stocks';
  }

  return (
    <>
      <Box sx={{display: 'flex', flexDirection: 'row-reverse', margin:'10px'}}>
        <IconButton onClick={onClose} sx={{ padding: '5px' }}><CloseIcon/></IconButton>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '50px',
          textAlign: 'center',
          paddingBottom: '50px',
        }}
      >
        {/* 제목 */}
        <Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              color: 'base.lightActive',
              '& .MuiSvgIcon-root': { width: 28, height: 28 }
            }}
          >
            <FormatQuoteIcon sx={{ transform: 'rotate(180deg)' }} />
            <Typography sx={{ fontSize: 28, fontWeight: 800, color: 'base.dark' }}>
              {score}점
            </Typography>
            <FormatQuoteIcon/>
          </Box>

          <Box
            sx={{
              width: 50,
              height: 3,
              backgroundColor: 'base.dark',
              borderRadius: 2,
              margin: '12px auto 0'
            }}
          />
        </Box>

        {/* 추천 */}
        <Typography
          sx={{
            lineHeight: 1.8,
            fontSize: 20,
            fontWeight: 800,
            color: 'base.dark'
          }}
        >
          {getRecommendation()}
        </Typography>

        {/* 내용 */}
        <Typography sx={{ fontSize: 16, lineHeight: 1.8, padding: '0 50px' }}>
          주식 공부는 단순한 투자 수익을 넘어 경제 흐름을 이해하는 힘을 길러줍니다. <br/>
          기초 개념을 익히기만 해도 시장의 변화가 왜 일어나는지 빠르게 파악할 수 있고, <br/>
          앞으로의 금융 생활을 스스로 주도할 수 있는 자신감이 생깁니다. <br/><br/>

          기업이 어떻게 돈을 벌고 성장하는지 알게 되면 소비·저축·재무 관리에 기준이 생깁니다. <br/>
          예금·적금·채권·ETF 등 다양한 금융 상품을 비교하는 능력도 함께 커져요. <br/>
          이 과정은 나의 돈을 더 현명하게 움직이게 해 주는 탄탄한 기반이 됩니다. <br/><br/>

          지금의 작은 배움이 앞으로의 경제적인 선택을 더욱 단단하게 만들어 줄 거예요.
        </Typography>

        {/* 버튼 */}
        <Button
          variant='contained'
          component={Link}
          to={recommendedLink()}
          sx={{
            backgroundColor: 'background.base',
            color: 'base.dark',
            padding: '10px 20px',
            border: 2,
            borderColor: 'base.dark',
            borderRadius: '10px',
            fontWeight: 700,
            fontSize: 16,
            '&:hover': { backgroundColor: 'base.dark', color: 'text.contrastText' }
          }}
        >
          학습하러 가기
        </Button>
      </Box>
    </>
  )
}