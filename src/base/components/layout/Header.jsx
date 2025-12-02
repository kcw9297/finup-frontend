import React from 'react';
import { AppBar, Toolbar, Button, Box, IconButton, Typography, CircularProgress, Avatar, Icon } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import logo from '../../../assets/logo.png'
import { useAuthStore } from '../../stores/useAuthStore';
import { useLogout } from '../../hooks/useLogout';

/**
 * 홈페이지 Header
 */

export default function Header() {

  // 메뉴 목록
  const manuItems = ["개념+", "뉴스+", "종목+", "단어장+"];
  const { isAuthenticated, loading, loginMember } = useAuthStore()
  const navigate = useNavigate();
  const { handleLogout } = useLogout()

  return (
    <AppBar 
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor:'white',
        color:'text.primary',
        boxShadow:'none',  // 박스 그림자 제거
        border:'none',     // 테두리 선 제거
        borderRadius:0,    // 둥근 모서리 제거
      }}
    >
      <Toolbar 
        sx={{ 
          minHeight:'80px !important', // 최소 높이 조절 (height 와 값이 일치해야 함)
          height:80,
          py:0,
          px:3,
          display:"flex",
          justifyContent:"center" ,border:"1px solid #eee",
          margin:0,
          padding:0
        }}
      >
        <Box sx={{
          display:'flex',
          justifyContent:'space-between',
          alignItems:"center",
          width:"100%",
          maxWidth:"1440px",
          margin:0,
          padding:0
          }}>

          {/* 좌측 로고 + 메뉴 */}
          <Box sx={{display:'flex', alignItems:'center', flex:1, margin:0, padding:0, gap:'50px'}}>
            
            {/* 로고 */}
            <Box component={Link} to="/" sx={{display:'flex', justifycontent:'center', alignItems:'center', cursor:'pointer'}} >
              <img src={logo} alt="로고" style={{height: 30}} />
            </Box>
            
            
            {/* 메뉴 */}
            <Box sx={{display:{md:'flex'}, gap:'30px', mx:2}}>
              {manuItems.map((menu) => (
                <Typography
                  key={menu}
                  sx={{
                    cursor: "pointer",
                    fontSize: 16,
                    color: "text.light",
                    transition: "0.2s",
                    "&:hover": {color: "text.main"}
                  }}>
                  {menu}
                </Typography>
              ))}
            </Box>
          </Box>

          {/* 우측 프로필 + 로그인 */}
          <Box sx={{display:'flex', alignItems:'center', gap:3}}>

            <Box onClick={() => alert('프로필 클릭')} sx={{
              height:50,
              display:'flex',
              alignItems:'center',
              gap:1,
              padding:'10px',
              borderRadius:2,
              cursor: "pointer",
              "&:hover": {backgroundColor:"background.light"}
              }}>
              {/* 프로필 아이콘 */}
              <Box >
                <Avatar 
                  src={loginMember?.profileImageUrl} // 프로필 이미지 URL
                  sx={{ width: 30, height: 30}}
                >
                  {/* 이미지 없을 때 Avatar 컴포넌트에서 자동으로 기본 이미지로 처리 */}
                  <AccountCircleIcon sx={{fontSize:30, color:"inherit", backgroundColor:"action"}}/>
                </Avatar>
              </Box>
              <p style={{fontSize: 14, color: "text.main"}}>로그인이 필요합니다</p>
            </Box>

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
        </Box>
      </Toolbar>
    </AppBar>
  );
}