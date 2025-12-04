/**
 * [GET] /admin/notices/{noticeId} 대응 페이지 컴포넌트
 */

import MainLayout from "../../../base/layouts/MainLayout";
import AdminNoticeDetail from "../../../features/admin/notices/components/AdminNoticeDetail";

export default function NoticeListPage() {
  return (
    <MainLayout>
      <AdminNoticeDetail />
    </MainLayout>
  );
}
