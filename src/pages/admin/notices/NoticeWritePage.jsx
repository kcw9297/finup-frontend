/**
 * [POST] /admin/notices/{noticeId} 대응 페이지 컴포넌트
 */

import MainLayout from "../../../base/layouts/MainLayout";
import NoticeWrite from "../../../features/admin/notices/components/AdminNoticeWrite";

export default function NoticeWritePage() {
  return (
    <MainLayout>
      <NoticeWrite />
    </MainLayout>
  )
}