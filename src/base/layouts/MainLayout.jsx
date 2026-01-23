import { Box } from "@mui/material";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import thema from "../../base/design/thema.js";
import { Outlet } from 'react-router-dom';

/**
 * 기본적으로 사용하는 메인 레이아웃
 */
export default function MainLayout() {

    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <Box component="main" sx={{ flex: 1, maxWidth: 1400, margin: 'auto', width: '100%', padding: '0 20px' }}>
          <Outlet />
        </Box>
        <Footer />
      </Box>
    );
}