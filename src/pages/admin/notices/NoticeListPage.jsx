/**
 * /admin/notices 대응 페이지 컴포넌트
 */

import MainLayout from "../../../base/layouts/MainLayout";
import AdminNoticeList from "../../../features/admin/notices/components/AdminNoticeList";

export default function NoticeListPage() {
  return (
    <MainLayout>
      <AdminNoticeList />
    </MainLayout>
  );
}
