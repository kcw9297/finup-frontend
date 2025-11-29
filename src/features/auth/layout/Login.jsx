import { Box, TextField, Button, Paper, Typography, Snackbar, Alert } from '@mui/material';
import SocialBtn from '../../../base/components/button/SocialBtn.jsx';
import { GoogleIcon } from '../../../base/components/icon/icon.jsx';
import { useLogin } from '../../../base/hooks/useLogin.js';

export default function LoginForm() {
  
  // 로그인 custom hook
  const { loginRq, updateLoginRq, handleLogin } = useLogin()

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
        value={loginRq.email}
        onChange={(e) => updateLoginRq({ [e.target.name]: e.target.value })} // 상태 변경 처리 (필수)
        onKeyDown={(e) => e.key === 'Enter' && handleLogin()}  // 엔터 입력 시 로그인 시도
        autoComplete="off" // 자동완성 기능 제거
        sx={{ marginBottom: 2 }}
      />

      <TextField
        fullWidth
        label="비밀번호"
        type="password"
        name="password"
        value={loginRq.password}
        onChange={(e) => updateLoginRq({ [e.target.name]: e.target.value })} // 상태 변경 처리 (필수)
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

      <SocialBtn icon={<GoogleIcon />} text="구글 계정으로 로그인" onClick={() => alert('구글 로그인')} />

    </Paper>
  );
}