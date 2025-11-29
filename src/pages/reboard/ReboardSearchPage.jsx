import MainLayout from "../../base/layouts/MainLayout"
import ReboardSearch from "../../features/reboard/layout/ReboardSearch"

/**
 * 예시 Reboard 페이지 컴포넌트
 */

export default function ReboardSearchPage() {

  // BaseLayout 내에 실제로 사용할 컴포넌트를 조합
  return (
    <MainLayout>
      <ReboardSearch />
    </MainLayout>
  )
}