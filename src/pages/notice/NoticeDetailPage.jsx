/**
 * /admin/notices/{noticeId} 대응 페이지 컴포넌트
 */

import MainLayout from "../../base/layouts/MainLayout";
import NoticeDetail from "../../features/notice/components/NoticeDetail";

export default function NoticeListPage() {
  return (
    <MainLayout>
      <NoticeDetail />
    </MainLayout>
  );
}
