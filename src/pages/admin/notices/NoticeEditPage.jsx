/**
 * [PUT] /admin/notices/{noticeId} 대응 페이지 컴포넌트
 */

import MainLayout from "../../../base/layouts/MainLayout";
import AdminNoticeEdit from "../../../features/admin/notices/components/AdminNoticeEdit";

export default function NoticeEditPage() {
  return (
    <MainLayout>
      <AdminNoticeEdit />
    </MainLayout>
  )
}
