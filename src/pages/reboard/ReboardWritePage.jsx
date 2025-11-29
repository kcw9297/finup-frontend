import MainLayout from "../../base/layout/MainLayout"
import Login from "../../features/auth/layout/Login"

/**
 * 예시 Reboard 페이지 컴포넌트
 * ... 내에 실제로 사용할 컴포넌트를 조합
 */

export default function ReboardListPage() {

  // BaseLayout 내에 실제로 사용할 컴포넌트를 조합
  return (
    <MainLayout>
      <Login />
    </MainLayout>
  )
}