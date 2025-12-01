import { Box, TextField, Button, Paper, Typography, Snackbar, Alert } from '@mui/material';
import AuthSocialBtn from './AuthSocialBtn.jsx';
import { GoogleIcon } from '../../../base/components/icon/icon.jsx';
import { useAuthLogin } from '../hooks/useAuthLogin.js';

/**
 * 로그인 페이지 컴포넌트
 */

export default function AuthLogin() {
  
  // [1] 로그인 custom hook
  const { 
    authloginRq, changeAuthLoginRq, // 상태 (1번째 줄)
    handleLogin // 함수 (2번째 줄)
  } = useAuthLogin()

  // [2] 반환할 컴포넌트
  return (

    <Paper sx={{ 
      width: '100%', 
      maxWidth: 450, 
      transform: 'scale(1.3)',  // 배율 
      transformOrigin: 'center' // 배율 확대 시 정렬
    }}>
      
      <Typography component="h1" variant="h5" >
        로그인
      </Typography>

      <TextField
        fullWidth
        label="이메일"
        type="email"
        name="email"
        value={authloginRq.email}
        onChange={(e) => changeAuthLoginRq({ [e.target.name]: e.target.value })} // 상태 변경 처리 (필수)
        onKeyDown={(e) => e.key === 'Enter' && handleLogin()}  // 엔터 입력 시 로그인 시도
        autoComplete="off" // 자동완성 기능 제거
        sx={{ marginBottom: 2 }}
      />

      <TextField
        fullWidth
        label="비밀번호"
        type="password"
        name="password"
        value={authloginRq.password}
        onChange={(e) => changeAuthLoginRq({ [e.target.name]: e.target.value })} // 상태 변경 처리 (필수)
        onKeyDown={(e) => e.key === 'Enter' && handleLogin()}  // 엔터 입력 시 로그인 시도
        autoComplete="off" // 자동완성 기능 제거
        sx={{ marginBottom: 3 }}
      />

      <Button
        fullWidth
        variant="contained"
        size="large"
        onClick={handleLogin}
        sx={{ marginBottom: 1.5 }}
      >
        로그인
      </Button>

      <AuthSocialBtn icon={<GoogleIcon />} text="구글 계정으로 로그인" onClick={() => alert('구글 로그인')} />

    </Paper>
  );
}