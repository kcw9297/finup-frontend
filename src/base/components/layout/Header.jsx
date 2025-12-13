import React, { useState } from 'react';
import { AppBar, Toolbar, Box, IconButton, Typography, CircularProgress, Avatar } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import logo from '../../../assets/logo.png'
import { useAuthStore } from '../../stores/useAuthStore';
import { useLogout } from '../../hooks/useLogout';
import WordbookPopup from '../../../features/word/components/WordbookPopup';


/**
 * 홈페이지 Header
 */

export default function Header() {

  // 메뉴 목록
  const manuItems = [
    { label: "개념+", path: "/login" },
    { label: "뉴스+", path: "/news/list" },
    { label: "종목+", path: "/stocks" },
    { label: "단어장+", action: "WORD_BOOK" }, // 팝업으로 띄우기로 했음. action으로 팝업 구분
  ]
  const { isAuthenticated, loading, loginMember } = useAuthStore()
  const navigate = useNavigate()
  const { handleLogout } = useLogout()
  const { pathname } = useLocation()


  const [openWordbook, setOpenWordBook] = useState(false)

  const onProfileCilck = () => {
    if (!isAuthenticated || !loginMember) navigate('/login');
    else if (loginMember.role === 'ADMIN') navigate('/admin/members');
    else navigate('/mypage');
  }


  // 단어장 팝업 관련 파트
  const openWordbookPopup = () => {
    setOpenWordBook(true)
  }

  const closeWordbookPopup = () => {
    setOpenWordBook(false)
  }


  return (
    <AppBar
      position='sticky'
      elevation={0}
      sx={{ backgroundColor: 'white', color: 'text.primary', borderRadius: 0 }}
    >
      <Toolbar
        sx={{
          minHeight: '80px !important', // 최소 높이 조절 (height 와 값이 일치해야 함)
          height: 80,
          display: 'flex',
          justifyContent: 'center',
          margin: 0,
          padding: 0,
        }}
      >
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          maxWidth: '1440px',
          margin: 0,
          padding: 0
        }}>

          {/* 좌측 로고 + 메뉴 */}
          <Box sx={{ display: 'flex', alignItems: 'center', flex: 1, margin: 0, padding: 0, gap: '50px' }}>

            {/* 로고 */}
            <Box component={Link} to="/" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }} >
              <img src={logo} alt="로고" style={{ height: 40 }} />
            </Box>

            {/* 메뉴 */}
            <Box sx={{ display: 'flex', gap: '30px' }}>
              {manuItems.map((item) => {

                if (item.action === "WORD_BOOK") {
                  return (
                    <Typography
                      key={item.label}
                      sx={{
                        cursor: "pointer",
                        fontSize: 16,
                        fontWeight: "bold",
                        color: "text.light",
                        "&:hover": { color: "text.main" },
                      }}
                      onClick={openWordbookPopup}
                    >
                      {item.label}
                    </Typography>
                  )
                }



                const isActive = pathname.startsWith(item.path)
                return (
                  <Typography
                    key={item.label}
                    component={Link}
                    to={item.path}
                    sx={{
                      cursor: 'pointer',
                      fontSize: 16,
                      fontWeight: 'bold',
                      color: isActive ? 'text.main' : 'text.light',
                      transition: '0.2s',
                      "&:hover": { color: 'text.main' }
                    }}>
                    {item.label}
                  </Typography>
                )
              })}
            </Box>
          </Box>
          <WordbookPopup
            open={openWordbook}
            onClose={closeWordbookPopup}
          />

          {/* 우측 프로필 + 로그인 */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>

            <Box onClick={() => { onProfileCilck() }} sx={{
              height: 50,
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px',
              borderRadius: 2,
              cursor: 'pointer',
              "&:hover": { backgroundColor: 'background.light' }
            }}>

              {/* 프로필 아이콘 */}
              <Box>
                <Avatar
                  src={loginMember?.profileImageUrl} // 프로필 이미지 URL
                  sx={{ width: 35, height: 35 }}
                >
                  {/* 이미지 없을 때 Avatar 컴포넌트에서 자동으로 기본 이미지로 처리 */}
                  <AccountCircleIcon sx={{ fontSize: 35, color: 'inherit', backgroundColor: 'action' }} />
                </Avatar>
              </Box>

              {loading ? (
                <p style={{ fontSize: 14, color: "text.main" }}></p>
              ) : isAuthenticated ? (
                <p style={{ fontSize: 14, color: "text.main" }}>{loginMember.nickname}님 환영합니다</p>
              ) : (
                <p style={{ fontSize: 14, color: "text.main" }}>로그인이 필요합니다</p>
              )}

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