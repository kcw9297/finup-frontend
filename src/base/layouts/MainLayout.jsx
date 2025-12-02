import { Box } from "@mui/material";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

/**
 * 기본적으로 사용하는 메인 레이아웃
 */
export default function MainLayout({ children }) {

  return (
    // 외부 박스 영역 (높이 결정 가능)
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>

      {/* 헤더 영역 */}
      <Header />

      {/* 중앙 메인 영역 (너비 관리) */}
      <Box
        component="main"
        sx={{
          flex: 1, // 남은 공간 차지

          // 너비 설정
          maxWidth: 1400,
          margin: '0 auto',
          padding: 2,
          width: '100%',
        }}
      >
        {children}
      </Box>

      {/* 푸터 영역 */}
      <Footer />
    </Box>
  )
}