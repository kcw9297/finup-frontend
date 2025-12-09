/**
 * [GET] /admin/members 대응 페이지 컴포넌트
 */

import MemberList from "../../../features/admin/member/components/MemberList";
import SidebarLayout from "../../../base/layouts/SidebarLayout";
import AdminSidebar from "../../../base/components/layout/AdminSidebar";

export default function MemberListPage() {
  return (

    <SidebarLayout sidebar={<AdminSidebar />}>
      <MemberList />
    </SidebarLayout>


  )
}