import { Box, TextField, Button, Paper, Typography, Divider, Stack } from '@mui/material';

/**
 * 소셜 로그인 버튼 컴포넌트
 */

export default function AuthSocialBtn ({ icon, text, onClick, ...props }) {
  return (
    <Button
      fullWidth
      variant="outlined"
      size="large"
      onClick={onClick}
      sx={{
        position: 'relative',
        justifyContent: 'center',
        color: '#000', // 검은색 텍스트
        borderColor: '#dadce0',
        textTransform: 'none', // 대문자 변환 방지
        fontSize: '14px',
        fontWeight: 500,
        padding: '10px 24px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        '&:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.04)',
          borderColor: '#dadce0',
        },
        // 아이콘을 왼쪽에 고정
        '& .MuiButton-startIcon': {
          position: 'absolute',
          left: '16px',
          margin: 0,
        },
      }}
      startIcon={icon}
      {...props}
    >
      {text}
    </Button>
  );
};