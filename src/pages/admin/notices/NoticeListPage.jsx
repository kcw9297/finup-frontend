/**
 * /admin/notices 대응 페이지 컴포넌트
 */

import MainLayout from "../../../base/layouts/MainLayout";
import AdminNoticeList from "../../../features/admin/notices/components/AdminNoticeList";
import SidebarLayout from "../../../base/layouts/SidebarLayout";
import AdminSidebar from "../../../base/components/layout/AdminSidebar";
export default function NoticeListPage() {
  return (
    <SidebarLayout sidebar={<AdminSidebar />}>
      <AdminNoticeList />
    </SidebarLayout>
  );
}
