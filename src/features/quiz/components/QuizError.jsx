import { Box, Button, Typography, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote'

// 시작 화면

export default function QuizError({ onClose }) {

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
          justifyContent: 'center',
          gap: '50px',
          textAlign: 'center',
          paddingBottom: '50px',
          minHeight: 450,
        }}
      >
        {/* 에러 메시지 */}
        <Typography sx={{ lineHeight: 1.8, fontSize: 16, whiteSpace: 'pre-line' }}>
          문제를 불러오지 못했습니다.{'\n'}잠시 후에 다시 시도해 주세요.
        </Typography>

        {/* 닫기 버튼 */}
        <Button
          variant='contained'
          onClick={onClose}
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
          닫기
        </Button>
      </Box>
    </>
  )
}