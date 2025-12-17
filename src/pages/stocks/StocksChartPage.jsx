import MainLayout from "../../base/layouts/MainLayout"
import { Box } from "@mui/material";
import thema from "../../base/design/thema.js"
import StocksDetailChart from "../../features/stocks/components/StocksDetailChart.jsx";

/**
 * Stocks 차트 페이지 컴포넌트
 */

export default function StocksListPage() {

  // BaseLayout 내에 실제로 사용할 컴포넌트를 조합
  return (
    <MainLayout>
      <Box  sx={{backgroundColor: thema.palette.background.light}}>
        <StocksDetailChart />
      </Box>
    </MainLayout>
  )
}