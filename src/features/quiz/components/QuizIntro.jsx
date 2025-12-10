import { Box, Button, Typography, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote'

// 시작 화면

export default function QuizIntro({ onStart, onClose }) {
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
              개념 확인하기
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

        {/* 내용 */}
        <Typography sx={{ lineHeight: 1.8, fontSize: 16 }}>
          이 테스트는 일상에서 자주 접하게 되는 핵심 개념을 중심으로, <br />
          현재 나의 이해 수준을 객관적으로 점검할 수 있도록 구성되었습니다. <br /><br />

          단순히 맞고 틀림을 확인하는 데 그치지 않고, 앞으로 어떤 학습이 <br />
          필요한지 방향을 제시하여 기초를 탄탄히 다지는 데 도움을 줍니다. <br /><br />

          지금 바로 나의 경제·금융 이해력을 진단해 보세요.
        </Typography>

        {/* 버튼 */}
        <Button
          variant='contained'
          onClick={onStart}
          sx={{
            backgroundColor: 'background.base',
            color: 'base.dark',
            padding: '10px 20px',
            border: 2,
            borderColor: 'base.dark',
            borderRadius: '10px',
            fontWeight: 600,
            fontSize: 16,
            '&:hover': { backgroundColor: 'base.dark', color: 'text.contrastText' }
          }}
        >
          테스트 진행하기
        </Button>
      </Box>
    </>
  )
}