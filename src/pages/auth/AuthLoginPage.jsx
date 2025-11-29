import EmptyLayout from '../../base/layouts/EmptyLayout'
import Login from "../../features/auth/layout/Login"

/**
 * 로그인 페이지 컴포넌트
 */

export default function AuthLoginPage() {

  return (
    <EmptyLayout>
      <Login />
    </EmptyLayout>
  )
}