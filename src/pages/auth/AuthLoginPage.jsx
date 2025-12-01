import EmptyLayout from '../../base/layouts/EmptyLayout'
import AuthLogin from "../../features/auth/components/AuthLogin"

/**
 * /auth/login 대응 페이지 컴포넌트
 */

export default function AuthLoginPage() {

  return (
    <EmptyLayout>
      <AuthLogin />
    </EmptyLayout>
  )
}