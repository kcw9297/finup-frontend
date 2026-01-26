// SidebarLayout.jsx
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

export default function SidebarLayout({ 
  sidebar, 
  sidebarPosition = "left",
  maxWidth = 1440,
  sidebarWidth = 240
}) {
  return (
    <Box
      sx={{
        maxWidth,
        width: "100%",
        mx: "auto",
        display: "flex",
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: "flex-start",
        gap: 4,
        pt: 4,
        pb: 4,
      }}
    >
      {/* 왼쪽 사이드바 */}
      {sidebarPosition === "left" && (
        <Box sx={{ 
          p: 2,
          width: { xs: '100%', md: sidebarWidth },
          flexShrink: 0,
          display: { xs: 'none', md: 'block' }
        }}>
          {sidebar}
        </Box>
      )}

      {/* 메인 콘텐츠 */}
      <Box sx={{ flex: 1, width: '100%' }}>
        <Outlet />
      </Box>

      {/* 오른쪽 사이드바 */}
      {sidebarPosition === "right" && (
        <Box sx={{ 
          width: { xs: '100%', md: sidebarWidth },
          flexShrink: 0,
          display: { xs: 'none', lg: 'block' },
          order: { xs: -1, lg: 0 }
        }}>
          {sidebar}
        </Box>
      )}
    </Box>
  );
}