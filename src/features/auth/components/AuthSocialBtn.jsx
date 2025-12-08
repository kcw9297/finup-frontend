import { Button} from '@mui/material';

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
        height: '40px',
        position: 'relative',
        justifyContent: 'center',
        color: 'text.main',
        backgroundColor: 'background.base',
        border: 1,
        borderColor: 'line.main',
        borderRadius: 2,
        textTransform: 'none', // 대문자 변환 방지
        fontSize: '14px',
        fontWeight: 500,
        marginBottom: '30px',
        '&:hover': {
          backgroundColor: 'background.light',
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