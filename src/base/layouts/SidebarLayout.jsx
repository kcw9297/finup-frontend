import { Box } from "@mui/material";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

/**
 * 왼쪽 사이드바를 사용하는 경우 사용하는 레이아웃 컴포넌트 (우측 영역)
 */
export default function SidebarLayout({ sidebar, children }) {

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        gap: 2, 
        maxWidth: 1200,
        margin: '0 auto',
        padding: 2,
        minHeight: 'calc(100vh - 64px - 100px)', // 헤더, 푸터 영역만큼 길이 제외 (헤더 푸터 변경시 변경 필요)
      }}
    >

      {/* 헤더 영역 */}
      <Header />

      {/* 좌측 사이드바 */}
      <Box 
        sx={{ 
          width: 250,
          border: '1px solid #e0e0e0', 
          borderRadius: 2, 
          p: 2, 
          flexShrink: 0,
          height: 'fit-content',
          position: 'sticky',
          top: 80, // 헤더 아래 고정
        }} 
      >
        {sidebar}
      </Box>
      
      {/* 우측 컨텐츠 */}
      <Box sx={{ flex: 1 }}>
        {children}
      </Box>

      {/* 푸터 영역 */}
      <Footer />
      
    </Box>
  )
}