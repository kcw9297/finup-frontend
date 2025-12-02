import MainLayout from "../../base/layouts/MainLayout"
import StocksSummaryTab from "../../features/stocks/components/StocksSummaryTab"

/**
 * Stocks 페이지 컴포넌트
 */

export default function StocksSummaryPage() {

  // BaseLayout 내에 실제로 사용할 컴포넌트를 조합
  return (
    <MainLayout>
      <StocksSummaryTab />
    </MainLayout>
  )
}