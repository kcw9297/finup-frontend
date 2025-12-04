import { Box } from "@mui/material";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

/**
 * 상단 Header, 하단 Footer 공통 사용 + 가운데 사이드바 레이아웃
 */
export default function SidebarLayout({ sidebar, children }) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* 상단 헤더 */}
      <Header />

      {/* 가운데 영역 : 사이드바 + 내용 */}
      <Box
        component="main"
        sx={{
          flex: 1,
          maxWidth: 1200,
          width: "100%",
          mx: "auto",
          display: "flex",
          alignItems: "flex-start",
          gap: 4,
          pt: 4,
          pb: 4,
        }}
      >
        {/* 왼쪽 사이드바 */}
        <Box sx={{ width: 220, flexShrink: 0 }}>
          {sidebar}
        </Box>

        {/* 오른쪽 콘텐츠 */}
        <Box sx={{ flex: 1 }}>
          {children}
        </Box>
      </Box>

      {/* 하단 푸터 */}
      <Footer />
    </Box>
  );
}
