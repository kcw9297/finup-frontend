import { Box, TextField, Button, Paper, Typography, Snackbar, Alert, IconButton, CircularProgress } from '@mui/material';
import AuthSocialBtn from './AuthSocialBtn.jsx';
import { GoogleIcon } from '../../../base/components/icon/icon.jsx';
import { useAuthLogin } from '../hooks/useAuthLogin.js';
import logo from '../../../assets/logo.png'
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
import { navigate } from '../../../base/config/globalHookConfig.js';

/**
 * 로그인 페이지 컴포넌트
 */

export default function AuthLogin() {

  // [1] 로그인 custom hook
  const {
    authloginRq, changeAuthLoginRq, loading,// 상태 (1번째 줄)
    handleLogin // 함수 (2번째 줄)
  } = useAuthLogin()

  // [2] 반환할 컴포넌트
  return (

    <Paper sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      gap: '30px',
      width: '100%',
      maxWidth: 350,
      border: 1,
      borderColor: 'base.main', // 테두리 색상
      padding: '0 30px',
    }}>
      <Box sx={{ display: 'flex', flexDirection: 'row-reverse', marginTop: '30px' }}>
        <IconButton
          onClick={() => navigate('/')}
          disabled={loading} // 로딩 중에는 비활성화
          sx={{ padding: '5px' }}
        >
          <CloseIcon /></IconButton>

      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
        <img src={logo} alt="로고" style={{ height: 35 }} />
      </Box>

      <Box sx={{
        display: 'flex', flexDirection: 'column', gap: '10px',
        '& .MuiOutlinedInput-root': { height: 40, borderRadius: 2, }, // TextField
        '& .MuiOutlinedInput-input': { padding: '6px 10px', fontSize: 14, },
        '& .MuiInputLabel-root': { fontSize: 14, transform: 'translate(10px, 10px) scale(1)', }, // 라벨
        '& .MuiInputLabel-shrink': { transform: 'translate(15px, -8px) scale(0.75)', }
      }}
      >
        <TextField
          label="이메일"
          type="email"
          name="email"
          value={authloginRq.email}
          onChange={(e) => changeAuthLoginRq({ [e.target.name]: e.target.value })} // 상태 변경 처리 (필수)
          onKeyDown={(e) => e.key === 'Enter' && handleLogin()}  // 엔터 입력 시 로그인 시도
          disabled={loading} // 로딩 중에는 비활성화
          autoComplete="off" // 자동완성 기능 제거
        />

        <TextField
          label="비밀번호"
          type="password"
          name="password"
          value={authloginRq.password}
          onChange={(e) => changeAuthLoginRq({ [e.target.name]: e.target.value })} // 상태 변경 처리 (필수)
          onKeyDown={(e) => e.key === 'Enter' && handleLogin()}  // 엔터 입력 시 로그인 시도
          disabled={loading} // 로딩 중에는 비활성화
          autoComplete="off" // 자동완성 기능 제거
        />

        <Button
          fullWidth
          variant="contained"
          size="large"
          onClick={handleLogin}
          disabled={loading} // 로딩 중에는 비활성화
          sx={{
            height: '40px', marginTop: '10px', borderRadius: 2, backgroundColor: 'base.main',
            '&:hover': { backgroundColor: 'base.dark', }
          }}
        >
          {loading ? (<CircularProgress size={24} sx={{ color: 'white' }} />) : '로그인'}
        </Button>

        <Typography
          component={Link} to="/join"
          sx={{ display: 'flex', flexDirection: 'row-reverse', fontSize: '12px', textDecorationLine: 'underline !important' }}
          disabled={loading} // 로딩 중에는 비활성화
        >
          회원가입
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px', }}>
        <Box sx={{ flex: 1, height: '1px', backgroundColor: 'line.dark' }} />
        <Typography sx={{ color: 'text.light', fontSize: 12 }}>간편 로그인</Typography>
        <Box sx={{ flex: 1, height: '1px', backgroundColor: 'line.dark' }} />
      </Box>

      <AuthSocialBtn icon={<GoogleIcon />} text="구글 계정으로 로그인" onClick={() => alert('구글 로그인')} />

    </Paper>
  );
}