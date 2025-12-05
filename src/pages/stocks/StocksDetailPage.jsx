import MainLayout from "../../base/layouts/MainLayout"
import { Box } from "@mui/material";
import thema from "../../base/design/thema.js"
import StocksDetail from "../../features/stocks/components/StocksDetail.jsx";

/**
 * Stocks 상세 페이지 컴포넌트
 */

export default function StocksListPage() {

  // BaseLayout 내에 실제로 사용할 컴포넌트를 조합
  return (
    <MainLayout>
      <Box  sx={{backgroundColor: thema.palette.background.light}}>
        <StocksDetail />
      </Box>
    </MainLayout>
  )
}