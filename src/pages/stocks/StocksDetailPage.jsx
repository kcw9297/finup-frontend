import MainLayout from "../../base/layouts/MainLayout"
import { Box } from "@mui/material";
import StocksDetailTab from "../../features/stocks/components/StocksDetailTab"
import StocksDetailNameCard from "../../features/stocks/components/StocksDetailNameCard";

/**
 * Stocks 상세 페이지 컴포넌트
 */

export default function StocksListPage() {

  // BaseLayout 내에 실제로 사용할 컴포넌트를 조합
  return (
    <MainLayout>
      <Box  sx={{backgroundColor: "#F1F4F7"}}>
        <StocksDetailNameCard />
        <StocksDetailTab />
      </Box>
    </MainLayout>
  )
}