/**
 * [PUT] /admin/notices/{noticeId} 대응 페이지 컴포넌트
 */

import MainLayout from "../../base/layouts/MainLayout";
import NoticeEdit from "../../features/notice/components/NoticeEdit";

export default function NoticeEditPage() {
  return (
    <MainLayout>
      <NoticeEdit />
    </MainLayout>
  )
}
