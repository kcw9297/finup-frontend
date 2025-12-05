/**
 * [GET] /admin/members 대응 페이지 컴포넌트
 */

import MainLayout from "../../../base/layouts/MainLayout";
import MemberList from "../../../features/admin/member/components/MemberList";

export default function MemberListPage() {
  return (
    <MainLayout>
      <MemberList />
    </MainLayout>
  )
}