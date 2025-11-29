import React from 'react';
import { AppBar, Toolbar, Button, Box, IconButton, Typography, CircularProgress, Avatar } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import logo from '../../../assets/logo.png'
import { useAuthStore } from '../../stores/useAuthStore';
import { useLogout } from '../../hooks/useLogout';

/**
 * 홈페이지 Header
 */

export default function Header() {

  // 메뉴 목록
  const manuItems = ["Products", "Docs", "Pricing", "About us", "Blog"];
  const { isAuthenticated, loading, loginMember } = useAuthStore()
  const navigate = useNavigate();
  const { handleLogout } = useLogout()

  return (
    <AppBar 
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: 'white',
        color: 'text.primary',
        boxShadow: 'none',  // 박스 그림자 제거
        border: 'none',     // 테두리 선 제거
        borderRadius: 0,    // 둥근 모서리 제거 
      }}
    >
      <Toolbar 
        sx={{ 
          minHeight: '10px !important', // 최소 높이 조절 (height 와 값이 일치해야 함)
          height: 10,
          py: 0,
          px: 3, 
        }}
      >
        {/* 좌측 로고 + 메뉴 */}
        <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
          
          {/* 로고 */}
          <Box component={Link} to="/" sx={{ cursor: 'pointer' }} >
            <img src={logo} alt="로고" style={{ height: 40 }} />
          </Box>
          
          
          {/* 메뉴 */}
          <Box sx={{ display: { md: 'flex' }, gap: 3, mt: 2, mx: 2 }}>
            {manuItems.map((menu) => (
              <Typography
                key={menu}
                sx={{
                  cursor: "pointer",
                  fontSize: 14,
                  color: "text.main",
                  transition: "0.2s",
                  "&:hover": {
                    color: "text.dark",   // hover 시 dark 색상 적용
                  }
                }}
              >
                {menu}
              </Typography>
            ))}
          </Box>
        </Box>

        {/* 우측 아이콘 */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>

          {/* 프로필 아이콘 */}
          <IconButton onClick={() => alert('프로필 클릭')}>
            <Avatar 
              src={loginMember?.profileImageUrl} // 프로필 이미지 URL
              sx={{ width: 40, height: 40,}}
            >
              {/* 이미지 없을 때 Avatar 컴포넌트에서 자동으로 기본 이미지로 처리 */}
              <PersonIcon />
            </Avatar>
          </IconButton>

          {/* 로그인/로그아웃 아이콘 */}
          {loading ? (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40 }}>
              <CircularProgress size={24} /> {/* 로딩 중에는 로딩 중으로 표시 */}
            </Box>
          ) : isAuthenticated ? (
            <IconButton onClick={() => handleLogout()} disabled={loading}>
              <LogoutIcon />
            </IconButton>
          ) : (
            <IconButton onClick={() => navigate('/login')} disabled={loading}>
              <LoginIcon />
            </IconButton>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}