import { Box, Typography } from "@mui/material"
import MainLayout from "../../base/layouts/MainLayout"
import StocksListTab from "../../features/stocks/components/StocksListTab"

/**
 * StocksList 페이지 컴포넌트
 */

export default function StocksListPage() {

  // BaseLayout 내에 실제로 사용할 컴포넌트를 조합
  return (
    <MainLayout>
      {/* 제목 섹션 */}
      <Box sx={{ mt: 4, mb: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
          종목 학습
        </Typography>
        <Typography variant="body2" color="text.secondary">
          실제 종목 정보를 통해 접하는 실전 지식
        </Typography>
      </Box>
      <StocksListTab />
    </MainLayout>
  )
}