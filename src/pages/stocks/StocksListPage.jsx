import MainLayout from "../../base/layouts/MainLayout"
import StocksListTab from "../../features/stocks/components/StocksListTab"

/**
 * StocksList 페이지 컴포넌트
 */

export default function StocksListPage() {

  // BaseLayout 내에 실제로 사용할 컴포넌트를 조합
  return (
    <MainLayout>
      <StocksListTab />
    </MainLayout>
  )
}